/* eslint-disable func-names */
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlacemarkSpec, PlacemarkSpecPlus } from "../models/joi-schemas.js";

export const placemarkApi = {
  find: {
    auth: false,
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
    notes: "Returns all playlists",
  },

  findOne: {
    auth: false,
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
        const Placemark = request.payload;
        const newPlacemark = await db.placemarkStore.addPlacemark(Placemark);
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
    validate: { payload: PlacemarkSpec, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: false,
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
    auth: false,
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },    
  tags: ["api"],
  description: "Delete all Placemarks",
};
