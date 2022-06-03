import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { analyticsApi } from "./api/analytics-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "PUT", path: "/api/users/{id}", config: userApi.update },
  
  { method: "GET", path: "/api/placemark", config: placemarkApi.find },
  { method: "GET", path: "/api/placemark/{id}", config: placemarkApi.findOne },
  { method: "GET", path: "/api/placemark/user/{id}", config: placemarkApi.findByUser },
  { method: "POST", path: "/api/placemark", config: placemarkApi.create },
  { method: "PUT", path: "/api/placemark/update", config: placemarkApi.update },
  { method: "POST", path: "/api/placemark/{id}/upload", config: placemarkApi.upload },
  { method: "DELETE", path: "/api/placemark/{id}", config: placemarkApi.deleteOne },
  { method: "DELETE", path: "/api/placemark", config: placemarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemark/editplacemark/{id}/deleteimage/{imageid}", config: placemarkApi.deleteImage},
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/analytics", config: analyticsApi.getAnalytics },

];