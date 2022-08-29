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
  return {...res,...data};
});

//个人需求表单
Mock.mock(baseURL + "/personalRequest", "get", {
  code: 20000,
  personalRequest: [
    {
      personId: "000001",
      name: "孟星羽",
      gender: "男",
      urgency: "紧急",
      phonenum: "18743379266",
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
      gender: "男",
      urgency: "一般",
      phonenum: "18723379266",
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
      gender: "男",
      urgency: "一般",
      phonenum: "18723335266",
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
      phonenum: "17923335266",
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
      phonenum: "18743379266",
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
      gender: "男",
      urgency: "一般",
      phonenum: "18723379266",
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
      gender: "男",
      urgency: "一般",
      phonenum: "27323335266",
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
      phonenum: "17923335266",
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
Mock.mock(baseURL + "/fake_Material_data", "get", {
  code: 20000,
  fake_Material_data: [
    {
      id: "000001",
      material_types: "食品",
      name: "趣多多",
      count: "2",
      type: "箱",
      isImp: "一般",
      units: "杨浦区疫情防控单位",
      units_phone: "23423234",
    },
    {
      id: "000003",
      material_types: "药品",
      name: "感康",
      count: "2",
      type: "盒",
      isImp: "重要",
      units: "嘉定区疫情防控单位",
      units_phone: "23421323234",
    },
    {
      id: "000011",
      material_types: "防护用品",
      name: "免洗消毒液",
      count: "66",
      type: "个",
      isImp: "重要",
      units: "嘉定区疫情防控单位",
      units_phone: "23143325423234",
    },
    {
      id: "000023",
      material_types: "食品",
      name: "趣多多",
      count: "2",
      type: "箱",
      isImp: "一般",
      units: "杨浦区疫情防控单位",
      units_phone: "23423234",
    },
    {
      id: "000101",
      material_types: "食品",
      name: "趣多对是非多",
      count: "223",
      type: "箱",
      isImp: "一般",
      units: "杨撒旦发射点区疫情防控单位",
      units_phone: "234232134234",
    },
    {
      id: "001201",
      material_types: "食品",
      name: "第三范式趣多多",
      count: "2",
      type: "盆",
      isImp: "一般",
      units: "杨浦区疫情防控单位",
      units_phone: "23423234",
    },
  ],
});

//核酸结果管理
Mock.mock(baseURL + "/fake_DNA_data", "get", {
  code: 20000,
  fake_DNA_data: [
    {
      name: "孟星羽",
      id: "2053853",
      sex: "男",
      idcard: "22223423345245634",
      sampleTime: "2022.6.6-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phonenum: "25352435",
      testResultTime: "2022.6.6-23:56",
    },
    {
      name: "孟士大夫星羽",
      id: "203453",
      sex: "女",
      idcard: "22223223445245634",
      sampleTime: "2022.12.6-22:02",
      place: "延吉市撒旦发射点人民医院",
      testResult: "阴性",
      phonenum: "253578435",
      testResultTime: "2022.12.12-23:56",
    },
    {
      name: "孟水电费星羽",
      id: "2053453",
      sex: "男",
      idcard: "222234523345245634",
      sampleTime: "2022.6.14-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phonenum: "25352535",
      testResultTime: "2022.6.14-23:56",
    },
    {
      name: "朱洵缘",
      id: "2053872",
      sex: "男",
      idcard: "2222342322545634",
      sampleTime: "2022.7.6-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phonenum: "25352435",
      testResultTime: "2022.7.6-23:56",
    },
    {
      name: "朱水电费洵缘",
      id: "2053853",
      sex: "男",
      idcard: "22223423345245634",
      sampleTime: "2022.6.6-22:02",
      place: "延吉市人地方官民医院",
      testResult: "阴性",
      phonenum: "25352435",
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
Mock.mock(baseURL + "/fake_supplies_data","get",{
  code:20000,
  fake_supplies_data: [
  {
    transport_id: "000001",
    material_name: "奥利奥",
    required_supplies_types: "食品",
    order_time:"2022-8-22",
    state: "等待揽收",
    required_supplies_num: 2,
    courier_name: "大泽森赛",
    courier_id:"007",
    courier_phone:"123456",
    departure:"上海",
    destination:"济南",
    current_location:"蚌埠",
  },
  {
    transport_id: "000002",
    material_name: "奥利给",
    required_supplies_types: "食品",
    order_time:"2022-8-22",
    state: "运输中",
    required_supplies_num: 999,
    courier_name: "大贤森赛",
    courier_id:"007",
    courier_phone:"123456",
    departure:"上海",
    destination:"济南",
    current_location:"蚌埠",
  },
  {
    transport_id: "000003",
    material_name: "奥利澳",
    required_supplies_types: "生活用品",
    order_time:"2022-8-22",
    state: "已签收",
    required_supplies_num: 999,
    courier_name: "刘某",
    courier_id:"007",
    courier_phone:"123456",
    departure:"上海",
    destination:"济南",
    current_location:"蚌埠",
  },
  {
    transport_id: "000099",
    material_name: "奥力奥",
    required_supplies_types: "其它",
    order_time:"2022-8-22",
    state: "已送达",
    required_supplies_num: 999,
    courier_name: "刘谋",
    courier_id:"007",
    courier_phone:"123456",
    departure:"上海",
    destination:"济南",
    current_location:"蚌埠",
  }
  ],
});

//隔离点分配fake_patients_data
Mock.mock(baseURL + "/fake_data", "get", {
  code: 20000,
  fake_patients_data: [
    {
      id: "000001",
      name: "大贤三赛",
      sex: "男",
      urgency: "紧急",
      phonenum: "18743379266",
      IDcard: "222543345352383946",
      location: "同济大学四平路校区",
      health: "重症",
      content: "请优先处理",
    },
    {
      id: "000006",
      name: "大贤老师",
      sex: "男",
      urgency: "一般",
      phonenum: "18723379266",
      IDcard: "222457345352383946",
      location: "同济大学嘉定校区",
      health: "无症状",
      content: "无",
    },
  ],
  fake_isolations_data: [
    {
      is_id: "000001",
      is_phonenum: "18743379266",
      is_location: "同济大学四平路校区",
      is_capacity: "100",
      is_allowance: "50",
    },
    {
      is_id: "000002",
      is_phonenum: "18723379266",
      is_location: "同济大学嘉定校区",
      is_capacity: "200",
      is_allowance: "20",
    },
  ],
});

//物资购买
Mock.mock(baseURL+"/purchData","get",{
  code:20000,
  purchData:[
    {
      needName: "bc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,

      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "c",
      needID: 2,
      needTime: "2022.7.22",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
  ]
})

//物资需求
Mock.mock(baseURL+"/needData","get",{
  code:20000,
  needData:[
    {
      needName: "bc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,

      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "c",
      needID: 2,
      needTime: "2022.7.22",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
    {
      needName: "fbc",
      needID: 2,
      needTime: "2022.7.20",
      needdOrganization: "Huangduligong",
      needdOrganizationID: 65742,
      city: "Shanghai",
      district: "Jiading",
      contactAddress: "caoangonglu 4800",
    },
  ]
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
})
