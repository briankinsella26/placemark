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
    validate: {
      payload: PlacemarkSpecPlus,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Edit placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const editedPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        category: request.payload.category,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.placemarkStore.editPlacemark(placemark, editedPlacemark);
      return h.redirect("/dashboard");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      await db.placemarkStore.deletePlacemark(request.params.id);
      return h.redirect("/dashboard");
    },
  },
};
