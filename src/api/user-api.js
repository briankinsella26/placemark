/* eslint-disable func-names */
import bcrypt from "bcrypt";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserCredentialsSpec, UserSpec, UserSpecPlus, IdSpec, UserArray, JwtAuth } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

const saltRounds = 10; 

export const userApi = {

  authenticate: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        const passwordsMatch = await bcrypt.compare(request.payload.password, user.password);
        if (!user) {
          return Boom.unauthorized("User not found");
        } if (!passwordsMatch) {
          return Boom.unauthorized("Invalid password");
        } 
        const token = createToken(user);
        return h.response({ success: true, token: token, id: user._id, scope: user.scope}).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate a user",
    notes: "Return a JWT token for valid users", 
    validate: { payload: UserCredentialsSpec, failAction: validationError },
    response: { schema: JwtAuth, failAction: validationError }
  },


  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a user",
    notes: "Returns details of a user",
    response: { schema: UserSpecPlus, failAction: validationError },
  },
  

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const userPayload = request.payload;
        userPayload.password = await bcrypt.hash(userPayload.password, saltRounds);
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },
  
  update: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.updateUser(request.payload);
        if (user) {
          return h.response(user).code(200);
        }
        return Boom.badImplementation("error updating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a User",
    notes: "Updates a user and returns 200",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all userApi",
    notes: "All userApi removed from Placemark",  
  },
};