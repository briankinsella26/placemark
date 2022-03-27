export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      scope: ["user"]
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      scope: ["user"]
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      scope: ["user"]
    },
    admin: {
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      password: "password",
      scope: ["admin"]
    }
  },
  placemarks: {
    _model: "Placemark",
    boathouse: {
      name: "seed name",
      description: "seed description",
      category: "Historic",
      latitude: 33.948615,
      longitude: -118.401382,
      userid: "->users.bart"
    }
  }
};
