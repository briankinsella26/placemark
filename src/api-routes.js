import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  
  { method: "GET", path: "/api/placemark", config: placemarkApi.find },
  { method: "GET", path: "/api/placemark/{id}", config: placemarkApi.findOne },
  { method: "POST", path: "/api/placemark", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemark/{id}", config: placemarkApi.deleteOne },
  { method: "DELETE", path: "/api/placemark", config: placemarkApi.deleteAll },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

];