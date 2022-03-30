/* eslint-disable prefer-template */
/* eslint-disable func-names */
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Placemark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Placemark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const userPayload = request.payload;
      userPayload.scope = "user";
      const user = await db.userStore.addUser(userPayload);
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Placemark" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect(user.scope.includes("admin")?"/admin":"/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  profile: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "My Profile",
        user: loggedInUser,
      };
      return h.view("profile", viewData);
    }
  },

  editProfile: {
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      user.firstName = request.payload.firstName;
      user.lastName = request.payload.lastName;
      if (request.payload.password.length > 0) {
        user.password = request.payload.password;
      }
      user.email = request.payload.email;
      await db.userStore.updateUser(user);
      return h.redirect("/dashboard");
    }
  },

  deleteUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      await db.userStore.deleteUserById(loggedInUser._id);
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
};
