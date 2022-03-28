
import { db } from "../models/db.js";

export const analytics = {
  
  async getNumberOfNewUsers(days){
    let userCount = 0;
    const users = await db.userStore.getAllUsers();
    for (let i = 0; i < users.length; i+=1) {
      const today = new Date();
      const dateDiff = today - users[i].signupDate;
        if( dateDiff / (1000 * 3600 * 24) <= days) {
          userCount +=1;
        }
    }
    return userCount;
  },

  async getTotalUsers(days){
    const users = await db.userStore.getAllUsers();
    return users.length;
  },

  async getTotalPlacemarks(days){
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    return placemarks.length;
  },

  async getLatesPlacemarks(noOfPlacemarks){
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    placemarks.sort((a, b) => b.createdate - a.createdate);
    console.log(placemarks);
    return placemarks.slice(0, noOfPlacemarks);
  },

}