const Mock = require("mockjs");
// const baseURL=process.env.BASE_URL

// process.env是node环境变量
// development环境下本地开发环境下自己配的
// BASE_URL地址,即:开发环境的接口域名
Mock.setup({
  timeout: 20,
});

// Random
const Random = Mock.Random;

// 这里暂时采用process.env.VUE_APP_BASE_URL + "/donateData"的简单方式封装...
// 后续考虑参考vue-admin对此封装
Mock.mock(process.env.VUE_APP_BASE_URL + "/donateData", "get", {
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

Mock.mock(process.env.VUE_APP_BASE_URL + "/donateData", "post", (req, res) => {
  let data = {
    username: "baokker",
    email: Random.email(),
  };
  return { ...data, ...req, code: 20000 };
});

//个人需求表单
Mock.mock(process.env.VUE_APP_BASE_URL + "/fake_supplies_data", "get", {
  code: 20000,
  fake_supplies_data: [
    {
      id: "000001",
      name: "孟星羽",
      sex: "男",
      urgency: "紧急",
      phonenum: "18743379266",
      IDcard: "222543345352383946",
      health: "正常",
      required_supplies_types: "食品",
      required_supplies: "趣多多",
      required_supplies_num: 2,
      content: "带瓶老干妈",
    },{
      id: "000006",
      name: "孟星羽阿松大",
      sex: "男",
      urgency: "一般",
      phonenum: "18723379266",
      IDcard: "222457345352383946",
      health: "正常",
      required_supplies_types: "食品",
      required_supplies: "趣多多",
      required_supplies_num: 4,
      content: "带瓶老干妈",
    },
    {
      id: "000012",
      name: "朱洵缘",
      sex: "男",
      urgency: "一般",
      phonenum: "18723335266",
      IDcard: "222457312792383946",
      health: "乏力",
      required_supplies_types: "药品",
      required_supplies: "莲花清瘟胶囊",
      required_supplies_num: 25,
      content: "多喝热水",
    }
    ,{
      id: "000021",
      name: "朱洵缘撒打算",
      sex: "女",
      urgency: "紧急",
      phonenum: "17923335266",
      IDcard: "223457312792383946",
      health: "乏力",
      required_supplies_types: "防护物资",
      required_supplies: "N95口罩",
      required_supplies_num: 20,
      content: "",
    },
    {
      id: "003201",
      name: "孟星羽",
      sex: "女",
      urgency: "紧急",
      phonenum: "18743379266",
      IDcard: "222543345352383946",
      health: "正常",
      required_supplies_types: "食品",
      required_supplies: "趣多多",
      required_supplies_num: 2,
      content: "带瓶老干妈",
    },{
      id: "000206",
      name: "孟大富大贵松大",
      sex: "男",
      urgency: "一般",
      phonenum: "18723379266",
      IDcard: "222457345352383946",
      health: "正常",
      required_supplies_types: "食品",
      required_supplies: "趣多多",
      required_supplies_num: 4,
      content: "带瓶老干妈",
    }
    ,{
      id: "000212",
      name: "朱胜多负少缘",
      sex: "男",
      urgency: "一般",
      phonenum: "27323335266",
      IDcard: "222457312792383946",
      health: "乏力",
      required_supplies_types: "药品",
      required_supplies: "莲花清瘟胶囊",
      required_supplies_num: 25,
      content: "多喝热水",
    }
    ,{
      id: "000011",
      name: "朱洵都会感到缘撒打算",
      sex: "女",
      urgency: "紧急",
      phonenum: "17923335266",
      IDcard: "223457312792383946",
      health: "乏力",
      required_supplies_types: "防护物资",
      required_supplies: "N95口罩",
      required_supplies_num: 20,
      content: "",
    },
  ],
});

//现有物资
Mock.mock(process.env.VUE_APP_BASE_URL + "/fake_Material_data", "get", {
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
    }, {
      id: "000003",
      material_types: "药品",
      name: "感康",
      count: "2",
      type: "盒",
      isImp: "重要",
      units: "嘉定区疫情防控单位",
      units_phone: "23421323234",
    }, {
      id: "000011",
      material_types: "防护用品",
      name: "免洗消毒液",
      count: "66",
      type: "个",
      isImp: "重要",
      units: "嘉定区疫情防控单位",
      units_phone: "23143325423234",
    }, {
      id: "000023",
      material_types: "食品",
      name: "趣多多",
      count: "2",
      type: "箱",
      isImp: "一般",
      units: "杨浦区疫情防控单位",
      units_phone: "23423234",
    }, {
      id: "000101",
      material_types: "食品",
      name: "趣多对是非多",
      count: "223",
      type: "箱",
      isImp: "一般",
      units: "杨撒旦发射点区疫情防控单位",
      units_phone: "234232134234",
    }, {
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
Mock.mock(process.env.VUE_APP_BASE_URL + "/fake_DNA_data", "get", {
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
      testResultTime:"2022.6.6-23:56",
    },{
      name: "孟士大夫星羽",
      id: "203453",
      sex: "女",
      idcard: "22223223445245634",
      sampleTime: "2022.12.6-22:02",
      place: "延吉市撒旦发射点人民医院",
      testResult: "阴性",
      phonenum: "253578435",
      testResultTime:"2022.12.12-23:56",
    },{
      name: "孟水电费星羽",
      id: "2053453",
      sex: "男",
      idcard: "222234523345245634",
      sampleTime: "2022.6.14-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phonenum: "25352535",
      testResultTime:"2022.6.14-23:56",
    },{
      name: "朱洵缘",
      id: "2053872",
      sex: "男",
      idcard: "2222342322545634",
      sampleTime: "2022.7.6-22:02",
      place: "延吉市人民医院",
      testResult: "阴性",
      phonenum: "25352435",
      testResultTime:"2022.7.6-23:56",
    },{
      name: "朱水电费洵缘",
      id: "2053853",
      sex: "男",
      idcard: "22223423345245634",
      sampleTime: "2022.6.6-22:02",
      place: "延吉市人地方官民医院",
      testResult: "阴性",
      phonenum: "25352435",
      testResultTime:"2022.6.6-23:56",
    },
    ],
  options2: [
    {
      value: "阴性",
      label: "阴性",
    },{
      value: "阳性",
      label: "阳性",
    },
  ],
});

//隔离点分配fake_patients_data
Mock.mock(process.env.VUE_APP_BASE_URL + "/fake_data", "get", {
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
  fake_isolations_data:[
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
  ]
});

Mock.mock(process.env.VUE_APP_BASE_URL + "/user/login", "post", (config) => {
  // 传递过来的是JSON 必须要先解析！之后考虑封装吧 现在还只是测试
  config.body = JSON.parse(config.body);

  if (config.body.userName != "admin" || config.body.passWord != "12345678") {
    console.log("Account and password are incorrect.");
    return {
      code: 60204,
      message: "账号或密码错误！",
    };
  } else {
    console.log("login successfully");
    return {
      code: 20000,
      token: "just a token",
    };
  }
});

Mock.mock(process.env.VUE_APP_BASE_URL + "/user/logout", "post", {
  code: 20000,
  data: "success",
});
