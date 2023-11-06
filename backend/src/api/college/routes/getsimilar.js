module.exports = {
  routes: [
    {
      method: "GET",
      path: "/getsimilar/:id",
      handler: "college.getsimilar",
      config: {
        auth: false
      }
    },
    {
      method: "GET",
      path: "/getbyperstate",
      handler: "college.getPerByRegion",
      config: {
        auth: false
      }
    },
    {
      method: "GET",
      path: "/getbystate/:state",
      handler: "college.getCollegesByState",
      config: {
        auth: false
      }
    },
    {
      method: "GET",
      path: "/getbypercourse",
      handler: "college.getPerByCourse",
      config: {
        auth: false
      }
    },
    {
      method: "GET",
      path: "/getbycourse/:course",
      handler: "college.getCollegesByCourse",
      config: {
        auth: false
      }
    },
    {
      method: "GET",
      path: "/studentsbycollege/:id",
      handler: "college.studentByCollege",
      config: {
        auth: false
      }
    },
  ],
};

