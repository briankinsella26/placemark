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
      name: "Lough Rea Boathouse",
      description: "On a lake",
      category: "Natural World",
      latitude: 33.948615,
      longitude: -118.401382,
      userid: "->users.bart"
    },
    bargyCastle: {
      name: "Bargy Castle",
      description: "Normal Castle, Historic",
      category: "Historic",
      latitude: 33.948615,
      longitude: -118.401382,
      userid: "->users.homer"
    },
    mountLeinster: {
      name: "Mount Leinster",
      description: "Spectacular Mountain",
      category: "Natural World",
      latitude: 33.948615,
      longitude: -118.401382,
      userid: "->users.bart"
    },
    centerParks: {
      name: "Center Parks",
      description: "Woodland Adventure",
      category: "Family",
      latitude: 33.948615,
      longitude: -118.401382,
      userid: "->users.marge"
    },
    castlegregoryBeach: {
      name: "Castlegregory Beach",
      description: "White Sands",
      category: "Natural World",
      latitude: 33.948615,
      longitude: -118.401382,
      userid: "->users.marge"
    },
    megalithicTombs: {
      name: "Boyne Valley Tombs",
      description: "Tombs",
      category: "Historic",
      latitude: 33.948615,
      longitude: -118.401382,
      userid: "->users.homer"
    },
    
  }
};
