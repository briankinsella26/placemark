import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    scope: Joi.array(),
    signupDate: Joi.date(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  scope: Joi.array(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// todo: move category to db
export const PlacemarkSpecBase = Joi.object().keys({
  name: Joi.string().required().example("Lough Rea Boat House"),
  description: Joi.string().required().example("An mid century boat house to rent a boat for the lake"),
  category: Joi.string().required().valid("Historic","Natural World", "Family", "Hiking", "Cycling").example("Hiking"),
  createdate: Joi.date(),
  }).label("PlacemarkBase");

export const PlacemarkSpec = PlacemarkSpecBase.keys({
  latitude: Joi.number().required().example(33.948615),
  longitude: Joi.number().required().example(-118.401382),
  }).label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
    }).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
