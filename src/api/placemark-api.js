/* eslint-disable func-names */
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
};
