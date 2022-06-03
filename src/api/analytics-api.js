/* eslint-disable func-names */
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { analytics } from "../utils/analytics.js"
import { NumberSpec } from "../models/joi-schemas.js"

export const analyticsApi = {
  getAnalytics: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const noOfNewUsers = await analytics.getNumberOfNewUsers(1);
        const placemarks = await analytics.getLatesPlacemarks(5);
        const totalUsers = await analytics.getTotalUsers();
        const totalPlacemarks = await analytics.getTotalPlacemarks();
        const placemarkAnalytics = {
          noOfNewUsers: noOfNewUsers,
          placemarks: placemarks,
          totalUsers: totalUsers,
          totalPlacemarks: totalPlacemarks,
        }
        return placemarkAnalytics;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: NumberSpec, failAction: validationError },
    description: "Gets number of users",
    notes: "Returns number of users",
  },
};
