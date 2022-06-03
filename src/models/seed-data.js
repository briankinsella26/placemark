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
      latitude: 52.160858,
      longitude: -7.152420,
      userid: "->users.bart"
    },
    bargyCastle: {
      name: "Bargy Castle",
      description: "Normal Castle, Historic",
      category: "Historic",
      latitude: 52.760858,
      longitude: -7.852420,
      userid: "->users.homer"
    },
    mountLeinster: {
      name: "Mount Leinster",
      description: "Spectacular Mountain",
      category: "Natural World",
      latitude: 52.760858,
      longitude: -8.1234,
      userid: "->users.bart"
    },
    centerParks: {
      name: "Center Parks",
      description: "Woodland Adventure",
      category: "Family",
      latitude: 51.760858,
      longitude: -7.401382,
      userid: "->users.marge"
    },
    castlegregoryBeach: {
      name: "Castlegregory Beach",
      description: "White Sands",
      category: "Natural World",
      latitude: 53.760858,
      longitude: -8.401382,
      userid: "->users.marge"
    },
    megalithicTombs: {
      name: "Boyne Valley Tombs",
      description: "Tombs",
      category: "Historic",
      latitude: 51.220858,
      longitude: -8.101382,
      userid: "->users.homer"
    },
    newgrange: {
      name: "Newgrange",
      description: "Tombs",
      category: "Historic",
      latitude: 53.948615,
      longitude: -8.001382,
      userid: "->users.homer"
    },
    waterfordgreenway: {
      name: "Waterford Greenway",
      description: "Scenic cycle for all the family",
      category: "Family",
      latitude: 51.948615,
      longitude: -7.601382,
      userid: "->users.homer"
    },
    giantscauseway: {
      name: "Giants Causway",
      description: "Beautiful landscape",
      category: "Natural World",
      latitude: 52.948615,
      longitude: -8.01382,
      userid: "->users.homer"
    },
    
  }
};
