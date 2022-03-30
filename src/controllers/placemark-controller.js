/* eslint-disable func-names */
import { PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const admin = loggedInUser.scope.includes("admin")
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
        img: placemark.img,
        admin: admin
      };
      return h.view("placemark-view", viewData);
    },
  },

  editPlacemark: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const admin = loggedInUser.scope.includes("admin")
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
        admin: admin
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

  uploadImage: {
    handler: async function(request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.addImageToPlacemark(placemark);
        }
        return h.redirect(`/placemark/editplacemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/editplacemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },
  
  deleteImage: {
    handler: async function (request, h) {
      try {
        await db.imageStore.deleteImage(request.params.id);
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    }
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      await db.placemarkStore.deletePlacemarkById(request.params.id);
      return h.redirect(loggedInUser.scope.includes("admin")?"/admin":"/dashboard");
    },
  },
}
