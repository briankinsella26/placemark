/* eslint-disable func-names */
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlacemarkSpec, PlacemarkSpecPlus, PlacemarkArraySpec, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const Placemarks = await db.placemarkStore.getAllPlacemarks();
        return Placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkArraySpec, failAction: validationError },
    description: "Get all placemarks",
    notes: "Returns all placemarks",
  },

  findByUser: {
      auth: false,
      handler: async function (request, h) {
        try {
          const Placemarks = await db.placemarkStore.getUserPlacemarks(request.params.id);
          return Placemarks;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      tags: ["api"],
      response: { schema: PlacemarkArraySpec, failAction: validationError },
      description: "Get user placemarks",
      notes: "Returns user placemarks",
  },



  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const Placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!Placemark) {
          return Boom.notFound("No placemark with this id");
        }
        return Placemark;
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific placemark",
    notes: "Returns details of a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemark = request.payload;
        console.log(placemark.placemark);
        const newPlacemark = await db.placemarkStore.addPlacemark(placemark.placemark);
        if (newPlacemark) {
          return h.response(newPlacemark).code(201);
        }
        return Boom.badImplementation("error creating Placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    // validate: { payload: PlacemarkSpec, failAction: validationError },
    // response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {

        const Placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!Placemark) {
          return Boom.notFound("No placemark with this id");
        }
        await db.placemarkStore.deletePlacemarkById(Placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Placemarks",
  },    

  update: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemark = request.payload;
        const updatedPlacemark = await db.placemarkStore.updatePlacemarkDetails(placemark.placemark);
        if (!updatedPlacemark) {
          return Boom.notFound("No placemark with this id");
        }
        return updatedPlacemark;
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
    tags: ["api"],
    description: "Update a specific placemark",
    notes: "Returns confirmation of success",
    // validate: { payload: PlacemarkSpec, failAction: validationError },
    // response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  upload: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        const response = await imageStore.uploadImage(request.payload.image);
        console.log(response);
        placemark.img = response;
        placemark.img.tags.push({placemarkid: request.params.id})
        console.log(placemark.img)
        db.placemarkStore.addImageToPlacemark(placemark);
        return h.response().code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Uploads an image",
    notes: "Adds image to placemark",
  },

  deleteImage: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const updatedPlacemark = placemark;
        updatedPlacemark.img = placemark.img.filter(( img ) => img.public_id !== request.params.imageid);
        db.placemarkStore.updatePlacemark(placemark, updatedPlacemark)
        await imageStore.deleteImage(request.params.imageid);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete an image",
    notes: "Removes image from placemark",
  }
};
