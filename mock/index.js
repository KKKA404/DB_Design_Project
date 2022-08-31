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
// const Random = Mock.Random;

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

//管理人员
Mock.mock(baseURL + "/manage", "post", {
  code: 20000,
})
Mock.mock(baseURL + "/manage", "delete", {
  code: 20000,
})
Mock.mock(baseURL + "/manage", "get", {
  code: 20000,
  manageRecord: [
    {
      unitId: "11",
      unitName: "haha",
      personId: "22",
      personName: "huhu",
    },
    {
      unitId: "33",
      unitName: "haha",
      personId: "22",
      personName: "huhu",
    }
  ]
})
Mock.mock(baseURL + "/manage", "post", {
  code: 20000,
})

//个人需求表单
Mock.mock(baseURL + "/personalRequest", "post", {
  code: 20000,
});
Mock.mock(baseURL + "/personalRequest", "put", {
  code: 20000,
});
Mock.mock(baseURL + "/personalRequest", "delete", {
  code: 20000,
});

Mock.mock(baseURL + "/personalRequest", "get", {
  code: 20000,
  personalRequest: [
    {
      personId: "000001",
      name: "孟星羽",
      gender: 1,
      urgency: "紧急",
      phoneNumber: "18743379266",
      IDcard: "222543345352383946",
      health: "正常",
      type: "食品",
      goodsName: "趣多多",
      num: 2,
      content: "带瓶老干妈",
    },
    {
      personId: "000006",
      name: "孟星羽阿松大",
      gender: 1,
      urgency: "一般",
      phoneNumber: "18723379266",
      IDcard: "222457345352383946",
      health: "正常",
      type: "食品",
      goodsName: "趣多多",
      num: 4,
      content: "带瓶老干妈",
    },
    {
      personId: "000012",
      name: "朱洵缘",
      gender: 1,
      urgency: "一般",
      phoneNumber: "18723335266",
      IDcard: "222457312792383946",
      health: "乏力",
      type: "药品",
      goodsName: "莲花清瘟胶囊",
      num: 25,
      content: "多喝热水",
    },
    {
      personId: "000021",
      name: "朱洵缘撒打算",
      gender: "女",
      urgency: "紧急",
      phoneNumber: "17923335266",
      IDcard: "223457312792383946",
      health: "乏力",
      type: "防护物资",
      goodsName: "N95口罩",
      num: 20,
      content: "",
    },
    {
      personId: "003201",
      name: "孟星羽",
      gender: "女",
      urgency: "紧急",
      phoneNumber: "18743379266",
      IDcard: "222543345352383946",
      health: "正常",
      type: "食品",
      goodsName: "趣多多",
      num: 2,
      content: "带瓶老干妈",
    },
    {
      personId: "000206",
      name: "孟大富大贵松大",
      gender: 1,
      urgency: "一般",
      phoneNumber: "18723379266",
      IDcard: "222457345352383946",
      health: "正常",
      type: "食品",
      goodsName: "趣多多",
      num: 4,
      content: "带瓶老干妈",
    },
    {
      personId: "000212",
      name: "朱胜多负少缘",
      gender: 1,
      urgency: "一般",
      phoneNumber: "27323335266",
      IDcard: "222457312792383946",
      health: "乏力",
      type: "药品",
      goodsName: "莲花清瘟胶囊",
      num: 25,
      content: "多喝热水",
    },
    {
      personId: "000011",
      name: "朱洵都会感到缘撒打算",
      gender: "女",
      urgency: "紧急",
      phoneNumber: "17923335266",
      IDcard: "223457312792383946",
      health: "乏力",
      type: "防护物资",
      goodsName: "N95口罩",
      num: 20,
      content: "",
    },
  ],
});

//现有物资
Mock.mock(baseURL + "/existingMaterial", "delete", {
  code: 20000,
});
Mock.mock(baseURL + "/existingMaterial", "put", {
  code: 20000,
});

Mock.mock(baseURL + "/existingMaterial", "get", {
  code: 20000,
  existingMaterial: [
    {
      goodsId: "000001",
      goodsType: "食品",
      goodsName: "趣多多",
      count: 2,
      type: "箱",
      isImp: "一般",
      units: "杨浦区疫情防控单位",
      unitsPhone: "23423234",
    },
    {
      goodsId: "000003",
      goodsType: "药品",
      goodsName: "感康",
      count: 2,
      type: "盒",
      isImp: "重要",
      units: "嘉定区疫情防控单位",
      unitsPhone: "23421323234",
    },
    {
      goodsId: "000011",
      goodsType: "防护用品",
      goodsName: "免洗消毒液",
      count: 66,
      type: "个",
      isImp: "重要",
      units: "嘉定区疫情防控单位",
      unitsPhone: "23143325423234",
    },
    {
      goodsId: "000023",
      goodsType: "食品",
      goodsName: "趣多多",
      count: 2,
      type: "箱",
      isImp: "一般",
      units: "杨浦区疫情防控单位",
      unitsPhone: "23423234",
    },
    {
      goodsId: "000101",
      goodsType: "食品",
      goodsName: "趣多对是非多",
      count: 223,
      type: "箱",
      isImp: "一般",
      units: "杨撒旦发射点区疫情防控单位",
      unitsPhone: "234232134234",
    },
    {
      goodsId: "001201",
      goodsType: "食品",
      goodsName: "第三范式趣多多",
      count: 2,
      type: "盆",
      isImp: "一般",
      units: "杨浦区疫情防控单位",
      unitsPhone: "23423234",
    },
  ],
});

//核酸结果管理
Mock.mock(baseURL + "/samplingData", "delete", {
  code: 20000,
});
Mock.mock(baseURL + "/samplingData", "put", {
  code: 20000,
});
Mock.mock(baseURL + "/samplingData", "post", {
  code: 20000,
});
Mock.mock(baseURL + "/samplingData", "get", {
  code: 20000,
  samplingData: [
    {
      name: "孟星羽",
      personId: "2053853",
      gender: 1,
      IDcard: "22223423345245634",
      sampleTime: "2022.6.6-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phoneNumber: "25352435",
      testResultTime: "2022.6.6-23:56",
    },
    {
      name: "孟士大夫星羽",
      personId: "203453",
      gender: 0,
      IDcard: "22223223445245634",
      sampleTime: "2022.12.6-22:02",
      place: "延吉市撒旦发射点人民医院",
      testResult: "阴性",
      phoneNumber: "253578435",
      testResultTime: "2022.12.12-23:56",
    },
    {
      name: "孟水电费星羽",
      personId: "2053453",
      gender: 1,
      IDcard: "222234523345245634",
      sampleTime: "2022.6.14-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phoneNumber: "25352535",
      testResultTime: "2022.6.14-23:56",
    },
    {
      name: "朱洵缘",
      personId: "2053872",
      gender: 1,
      IDcard: "2222342322545634",
      sampleTime: "2022.7.6-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phoneNumber: "25352435",
      testResultTime: "2022.7.6-23:56",
    },
    {
      name: "朱水电费洵缘",
      personId: "2053853",
      gender: 1,
      IDcard: "22223423345245634",
      sampleTime: "2022.6.6-22:02",
      place: "延吉市人地方官民医院",
      testResult: "阴性",
      phoneNumber: "25352435",
      testResultTime: "2022.6.6-23:56",
    },
  ],
  options2: [
    {
      value: "阴性",
      label: "阴性",
    },
    {
      value: "阳性",
      label: "阳性",
    },
  ],
});
//物资运输 -- MaterialTransport
Mock.mock(baseURL + "/transportData", "get", {
  code: 20000,
  transportData: [
    {
      materialID: "000001",
      materialName: "奥利奥",
      materialType: "食品",
      materialNum: 2,
      courierCompany: "某通",
      state: "等待揽收",
      courierName: "大泽森赛",
      courierID: "007",
      courierPhone: "123456",
      departure: "上海",
      destination: "济南",
      currentLocation: "蚌埠",
    },
    {
      materialID: "000002",
      materialName: "奥利给",
      materialType: "食品",
      materialNum: 999,
      courierCompany: "某达",
      state: "运输中",
      courierName: "大贤森赛",
      courierID: "007",
      courierPhone: "123456",
      departure: "上海",
      destination: "济南",
      currentLocation: "蚌埠",
    },
    {
      materialID: "000003",
      materialName: "奥利澳",
      materialType: "生活用品",
      materialNum: 999,
      courierCompany: "某风",
      state: "已签收",
      courierName: "刘某",
      courierID: "007",
      courierPhone: "123456",
      departure: "上海",
      destination: "济南",
      currentLocation: "蚌埠",
    },
    {
      materialID: "000099",
      materialName: "奥力奥",
      materialType: "其它",
      materialNum: 999,
      courierCompany: "未知？",
      state: "已送达",
      courierName: "刘谋",
      courierID: "007",
      courierPhone: "123456",
      departure: "上海",
      destination: "济南",
      currentLocation: "蚌埠",
    },
  ],
});


//病例记录
Mock.mock(baseURL + "/PatientRecord", "post", {
  code: 20000,
});
//隔离点分配patientsData

Mock.mock(baseURL + "/isolationData/assignmentData", "delete", {
  code: 20000,
});

Mock.mock(baseURL + "/isolationData/isolatedPointsData", "post", {
  code: 20000,
});

Mock.mock(baseURL + "/isolationData", "get", {
  code: 20000,
  assignmentData: [
    {
      id: "000001",
      name: "大贤三赛",
      gender: 1,
      phoneNumber: "18743379266",
      address: "同济大学四平路校区",
      signInDate: "8.29",
      signOutDate: "9.3",
    },
    {
      id: "000002",
      name: "大贤三赛",
      gender: 1,
      phoneNumber: "18743379377",
      address: "同济大学嘉定校区",
      signInDate: "8.27",
      signOutDate: "9.6",
    },
  ],
  isolatedPointsData: [
    {
      name: "同济迎宾馆",
      region: "上海市杨浦区",
      capacity: "100",
      num: "50",
      cost: "150",
    },
    {
      name: "同济大学博楼",
      region: "上海市嘉定区",
      capacity: "200",
      num: "10",
      cost: "15",
    },
  ],
});
//物资购买
Mock.mock(baseURL + "/purchaseData", "get", {
  code: 20000,
  unitPurchaseData: [
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "369",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "泡面",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
  ],
  donorPurchaseData: [
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "369",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "泡面",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
    {
      purchaseTime: "2022 8 29",
      materialName: "趣多多",
      materialNum: 3,
      materialPrice: "6",
      buyerID: "？",
      buyerName: "yangpuqu",
    },
  ],
});

//志愿信息提交
Mock.mock(baseURL + "/volunteerApplication", "post", {
  code: 20000,
});
Mock.mock(baseURL + "/volunteerApplication", "delete", {
  code: 20000,
});
Mock.mock(baseURL + "/volunteerApplication", "put", {
  code: 20000,
});
Mock.mock(baseURL + "/volunteerApplication", "get", {
  code: 20000,
  volunteerRecord: [
    {
      personId: "123",
      name: "huhu",
      district: "",
      location: "",
      riskLevel: "",
      volunteerLocation: "",
      date1: "",
      volunteerType: "",
    },
    {
      personId: "123",
      name: "haha",
      district: "",
      location: "",
      riskLevel: "",
      volunteerLocation: "",
      date1: "",
      volunteerType: "",
    },
  ]
});

//捐赠物资表单
Mock.mock(baseURL + "/donateData", "post", {
  code: 20000,
});




//物资购买（post）
Mock.mock(baseURL + "/purchaseData/unitPurchase", "post", {
  code: 20000,
  data: "success",
});
Mock.mock(baseURL + "/purchaseData/donorPurchase", "post", {
  code: 20000,
  data: "success",
});

//需求needData
Mock.mock(baseURL + "/needData", "delete", {
  code: 20000,
});

Mock.mock(baseURL + "/needData", "get", {
  code: 20000,
  needData: [
    {
      id: "000001",
      name: "孟星羽",
      phoneNumber: "18743379266",
      goodID: "002",
      type: "食品",
      goodName: "趣多多",
      num: 2,
      content: "",
    },
    {
      id: "000002",
      name: "大梦老师",
      phoneNumber: "18743379266",
      goodID: "003",
      type: "食品",
      goodName: "粉面菜蛋",
      num: 100,
      content: "金汤肥牛味",
    },
    {
      id: "000003",
      name: "大星老师",
      phoneNumber: "18743379266",
      goodID: "004",
      type: "生活用品",
      goodName: "浴花",
      num: 1,
      content: "很急，没法洗澡了",
    },
  ],
});

Mock.mock(baseURL + "/user/password", "post", {
  code: 20000,
})
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

Mock.mock(baseURL + "/user/logout", "post", {
  code: 20000,
  data: "success",
});

Mock.mock(RegExp(baseURL + "/user/info.*"), "get", (config) => {
  if (param2Obj(config.url).token.includes("admin")) {
    return {
      code: 20000,
      data: {
        roles: ["admin"],
        ID: "123",
        name: "admin",
        gender: 1,
        phoneNumber: "",
        age: 0,
      },
    };
  } else {
    return {
      code: 20000,
      data: {
        roles: ["user"],
        ID: "456",
        name: "user",
        gender: 0,
        phoneNumber: "12345678",
        age: 20,
      },
    };
  }
});

Mock.mock(baseURL + "/user/editInfo", "post", {
  code: 20000,
  data: "success",
});
