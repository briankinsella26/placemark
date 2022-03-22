import { userMongoStore } from "./user-mongo-store.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";
import { connectMongo } from "./connect.js";

export const db = {
  userStore: null,
  placemarkStore: null,

  init() {
    this.userStore = userMongoStore;
    this.placemarkStore = placemarkMongoStore;
    connectMongo();
  }
};
