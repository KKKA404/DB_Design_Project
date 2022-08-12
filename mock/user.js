const Mock = require("mockjs");

Mock.setup({
  timeout: 20,
});

// Random
const Random = Mock.Random;

Mock.mock(process.env.VUE_APP_BASE_URL + "/user/login", "post", 
  config=>{
    console.log(config);
    return {
      code: 20000,
      data: "123455", // token
    }
  }
);