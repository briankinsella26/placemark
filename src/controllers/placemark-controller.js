/* eslint-disable func-names */
import { PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  editPlacemark: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      return h.view("placemark-edit-view", viewData);
    },
  },

  updatePlacemark: {
    validate: {
      payload: PlacemarkSpecPlus,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Edit placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const editedPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        category: request.payload.category,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.placemarkStore.updatePlacemark(placemark, editedPlacemark);
      return h.redirect(loggedInUser.scope.includes("admin")?"/admin":"/dashboard");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      await db.placemarkStore.deletePlacemarkById(request.params.id);
      return h.redirect(loggedInUser.scope.includes("admin")?"/admin":"/dashboard");
    },
  },
};
