/* eslint-disable no-await-in-loop */
/* eslint-disable func-names */
import { db } from "../models/db.js";
import { analytics } from "../utils/analytics.js";

export const adminController = {
  index: {
    auth: {
      strategy: "session",
      scope: "admin"
    },
    handler: async function (request, h) {
      const loggedInAdmin = request.auth.credentials;
      const noOfNewUsers = await analytics.getNumberOfNewUsers(1);
      const placemarks = await analytics.getLatesPlacemarks(5);
      const totalUsers = await analytics.getTotalUsers();
      const totalPlacemarks = await analytics.getTotalPlacemarks();
      
      const viewData = {
        title: "Admin Dashboard",
        user: loggedInAdmin,
        noOfNewUsers: noOfNewUsers,
        placemarks: placemarks,
        totalUsers: totalUsers,
        totalPlacemarks: totalPlacemarks,
      };
      return h.view("admin-view", viewData);
    },
  },

  getUsers: {
    auth: {
      strategy: "session",
      scope: "admin"
    },
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const viewData = {
        title: "List of all users",
        users: users
      };
      return h.view("user-list-view", viewData);
    },
  },

  getUserDetails: {
    auth: {
      strategy: "session",
      scope: "admin"
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const placemarks = await db.placemarkStore.getUserPlacemarks(request.params.id)
      const viewData = {
        title: "User Details",
        user: user,
        placemarks: placemarks
      };
      return h.view("user-details-view", viewData);
    },
  },

  getPlacemarks: {
    auth: {
      strategy: "session",
      scope: "admin"
    },
    handler: async function (request, h) {
      const placemarks = await db.placemarkStore.getAllPlacemarks();
      const viewData = {
        title: "List of all placemarks",
        placemarks: placemarks
      };
      return h.view("placemark-list-view", viewData);
    },
  },

  deleteUser: {
    auth: {
      strategy: "session",
      scope: "admin"
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      if(user.email === "admin@admin.com") {
        console.log("Cannot delete admin user")
      } else {
        await db.userStore.deleteUserById(request.params.id);
      }
      return h.redirect("/admin");
    }
  },
}