/* eslint-disable no-console */
import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async updateUser(updatedUser) {
    console.log(updatedUser)
    await User.findByIdAndUpdate(updatedUser._id, updatedUser, (err, docs) => {
      if (err){
          console.log(err)
          return null
      } 
      return updatedUser
    })
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.name = updatedPlacemark.name;
    placemark.description = updatedPlacemark.description;
    placemark.category = updatedPlacemark.category;
    placemark.location = updatedPlacemark.location
    await Placemark.findByIdAndUpdate(placemark._id, placemark);
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  }
};
