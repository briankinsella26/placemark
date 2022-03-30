/* eslint-disable func-names */
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        placemarks: placemarks,
        path: loggedInUser.scope.includes("admin")?"/admin/placemarks":"/dashboard"
      };
      return h.view("dashboard-view", viewData);
    },
  },

  filter: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      let filteredPlacemarks = placemarks.filter((placemark) => placemark.category === request.query.category);
        if(request.query.category === "All") {
          filteredPlacemarks = placemarks
        }
      const viewData = {
        category: request.query.category,
        title: "Category",
        user: loggedInUser,
        placemarks: filteredPlacemarks,
        path: loggedInUser.scope.includes("admin")?"/admin/placemarks":"/dashboard"
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemark = {
        userid: loggedInUser._id,
        name: request.payload.name,
        description: request.payload.description,
        category: request.payload.category,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,

      };
      await db.placemarkStore.addPlacemark(newPlacemark);
      return h.redirect("/dashboard");
    },
  },
};
