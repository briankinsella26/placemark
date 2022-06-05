export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$u0lPqdRi9sd6ufBPsD04BuQglyjoFdKJ.N4BlBCmaughPYEV6FGdC",
      scope: ["user"]
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$OpMby8jeaDY1vmmAslN69.eItxnOSJTU3gREewTtxPyxN6OoW3.Ru",
      scope: ["user"]
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$p9xUubR/akOO9hj7XdWqfuooRkCsOhuz1mvU2OibX/8f7rYSa5f1e",
      scope: ["user"]
    },
    admin: {
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      password: "$2a$10$B/36dEjBmkjRfdWsY2ej1.7iKv6WQZ8uBr5Y6LVDEKU54TGU06mKK",
      scope: ["admin"]
    }
  },
  placemarks: {
    _model: "Placemark",
    boathouse: {
      name: "Lough Rea Boathouse",
      description: "On a lake",
      category: "Natural World",
      latitude: 53.19694,
      longitude: -7.566,
      userid: "->users.bart"
    },
    bargyCastle: {
      name: "Bargy Castle",
      description: "Norman Castle, Historic",
      category: "Historic",
      latitude: 52.2226,
      longitude: -6.4926,
      userid: "->users.homer"
    },
    mountLeinster: {
      name: "Mount Leinster",
      description: "Spectacular Mountain",
      category: "Natural World",
      latitude: 52.6182,
      longitude: -6.7804,
      userid: "->users.bart"
    },
    centerParks: {
      name: "Center Parks",
      description: "Woodland Adventure",
      category: "Family",
      latitude: 53.5555,
      longitude: -7.7074,
      userid: "->users.marge"
    },
    castlegregoryBeach: {
      name: "Castlegregory Beach",
      description: "White Sands",
      category: "Natural World",
      latitude: 52.2605,
      longitude: -10.0136,
      userid: "->users.marge"
    },
    loughCrewPassageTombs: {
      name: "Lough Crew Tombs",
      description: "Tombs",
      category: "Historic",
      latitude: 53.4441,
      longitude: -7.645,
      userid: "->users.homer"
    },
    newgrange: {
      name: "Newgrange",
      description: "Tombs",
      category: "Historic",
      latitude: 53.6947,
      longitude: -6.4755,
      userid: "->users.homer"
    },
    waterfordgreenway: {
      name: "Waterford Greenway",
      description: "Scenic cycle for all the family",
      category: "Family",
      latitude: 52.2012024986,
      longitude: -7.4072098732,
      userid: "->users.homer"
    },
    giantscauseway: {
      name: "Giants Causway",
      description: "Beautiful landscape",
      category: "Natural World",
      latitude: 55.2408,
      longitude: -6.5116,
      userid: "->users.homer"
    },
    naturalHistoryMuseum: {
      name: "Natural History Museum",
      description: "Irelands history",
      category: "Historic",
      latitude: 53.340080,
      longitude: -6.255072,
      userid: "->users.homer"
    },
    cliffsOfMoher: {
      name: "Cliffs of Moher",
      description: "Beautiful landscape",
      category: "Natural World",
      latitude: 52.9715,
      longitude: -9.4309,
      userid: "->users.homer"
    },
    theFamineGarden: {
      name: "The Famine Garden",
      description: "Commermorating the famine",
      category: "Historic",
      latitude: 52.47423077,
      longitude: -7.26074131,
      userid: "->users.homer"
    },
    macgillycuddyReeks: {
      name: "Macgillycuddy's Reeks",
      description: "Beautiful landscape",
      category: "Hiking",
      latitude: 52.0100,
      longitude: -9.7000,
      userid: "->users.homer"
    },
    oceanicsSurfSchool: {
      name: "Oceanics Surf School",
      description: "Beautiful landscape",
      category: "Family",
      latitude: 52.7524434,
      longitude: -7.3316689,
      userid: "->users.marge"
    },
  }
};
