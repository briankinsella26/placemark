export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
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
