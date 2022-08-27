const Mock = require("mockjs");

const baseURL = process.env.VUE_APP_BASE_URL;

// process.env是node环境变量
// development环境下本地开发环境下自己配的
// BASE_URL地址,即:开发环境的接口域名
Mock.setup({
  timeout: 20,
});

// get 带参数，将后面的参数转为对象
function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

// Random
const Random = Mock.Random;

// 这里暂时采用baseURL + "/donateData"的简单方式封装...
// 后续考虑参考vue-admin对此封装
Mock.mock(baseURL + "/donateData", "get", {
  // 当post或get请求到/donateData时
  // Mock会拦截请求
  // 并返回数据
  code: 20000,
  donateData: [
    {
      donateName: "bc",
      donateID: 2,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,

      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "c",
      donateID: 2,
      donateTime: "2022.7.22",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "fbc",
      donateID: 2,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "fbc",
      donateID: 2,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "fbc",
      donateID: 2,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "fbc",
      donateID: 2,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "fbc",
      donateID: 2,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "fbc",
      donateID: 2,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      donateName: "mxy",
      donateID: 99,
      donateTime: "2022.7.20",
      donatedOrganization: "Huangduligong",
      donatedOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
  ],
});

Mock.mock(baseURL + "/donateData", "post", (req, res) => {
  let data = {
    username: "baokker",
    email: Random.email(),
  };
  return { ...data, ...req, code: 20000 };
});

Mock.mock(baseURL + "/user/login", "post", (config) => {
  // 传递过来的是JSON 必须要先解析！之后考虑封装吧 现在还只是测试
  config.body = JSON.parse(config.body);

  if (
    (config.body.userName != "admin" && config.body.userName != "user") ||
    config.body.passWord != "12345678"
  ) {
    console.log("Account and password are incorrect.");
    return {
      code: 60204,
      message: "账号或密码错误！",
    };
  } else {
    console.log("login successfully");
    return {
      code: 20000,
      token: config.body.userName + "-token",
    };
  }
});

Mock.mock(process.env.VUE_APP_BASE_URL + "/user/logout", "post", {
  code: 20000,
  data: {
    roles: ["user"],
    name: "user",
  },
},
);

Mock.mock(RegExp(baseURL + "/user/info.*"), "get", (config) => {
  if (param2Obj(config.url).token.includes("admin")) {
    return {
      code: 20000,
      data: {
        roles: ["admin"],
        name: "admin",
      },
    };
  } else {
    return {
      code: 20000,
      data: {
        roles: ["user"],
        name: "user",
      },
    };
  }
});