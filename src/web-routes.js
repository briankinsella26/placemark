import { aboutController } from "./controllers/about-controller.js"
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },

  { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
  { method: "GET", path: "/placemark/editplacemark/{id}", config: placemarkController.editPlacemark },
  { method: "POST", path: "/placemark/updateplacemark/{id}", config: placemarkController.updatePlacemark },
  { method: "GET", path: "/placemark/deleteplacemark/{id}", config: placemarkController.deletePlacemark },

  { method: "GET", path: "/admin", config: adminController.index},
  { method: "GET", path: "/admin/placemarks", config: adminController.getPlacemarks},
  { method: "GET", path: "/admin/users", config: adminController.getUsers},
  { method: "GET", path: "/admin/users/{id}", config: adminController.getUserDetails},
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser},

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
