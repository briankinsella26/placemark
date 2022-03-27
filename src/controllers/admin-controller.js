/* eslint-disable no-await-in-loop */
/* eslint-disable func-names */
import { db } from "../models/db.js";

export const adminController = {
  index: {
    auth: {
      strategy: "session",
      scope: "admin"
    },
    handler: async function (request, h) {
      const loggedInAdmin = request.auth.credentials;
      const placemarks = await db.placemarkStore.getAllPlacemarks();
      const userPlacemarkDetailsArray = []
      for(let i = 0; i < placemarks.length; i+=1) {
        const user = await db.userStore.getUserById(placemarks[i].userid);
        const userPlacemarkDetails = {};
        userPlacemarkDetails.placemark = placemarks[i];
        userPlacemarkDetails.user = user;
        userPlacemarkDetailsArray.push(userPlacemarkDetails)
      }
      const viewData = {
        title: "Admin Dashboard",
        user: loggedInAdmin,
        userplacemarkdetails: userPlacemarkDetailsArray,
      };
      const resp = h.response("success").header("return-url", "admin");
      return resp.view("admin-view", viewData);
    },
  },
}