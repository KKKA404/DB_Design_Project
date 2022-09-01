import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { login, getInfo, logout } from "@/api/user.js";

const getDefaultState = () => {
  return {
    token: getToken(),
    ID: "",
    name: "",
    roles: [],
    gender: 1, // 1 = male, 0 = female
    phoneNumber: "",
    age: 0,
  };
};

const state = {
  token: getToken(),
  ID: "",
  name: "",
  roles: [],
  gender: 1, // 1 = male, 0 = female
  phoneNumber: "",
  age: 0,
};

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ID: (state, ID) => {
    state.ID = ID;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_GENDER: (state, gender) => {
    state.gender = gender;
  },
  SET_AGE: (state, age) => {
    state.age = age;
  },
  SET_PHONE_NUMBER: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, passWord } = userInfo;
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), passWord: passWord })
        .then((res) => {
          const { token } = res;
          // const { token, data} = res;

          commit("SET_TOKEN", token);
          setToken(token);

          // const { roles, ID, name, gender, phoneNumber, age } = data;
          // // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   reject("getInfo: roles must be a non-null array!");
          // }

          // commit("SET_ROLES", roles);
          // commit("SET_ID", ID);
          // commit("SET_NAME", name);
          // commit("SET_GENDER", gender);
          // commit("SET_PHONE_NUMBER", phoneNumber);
          // commit("SET_AGE", age);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token)
      getInfo()
        .then((res) => {
          const { data } = res;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { roles, ID, name, gender, phoneNumber, age } = data;
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", roles);
          commit("SET_ID", ID);
          commit("SET_NAME", name);
          commit("SET_GENDER", gender);
          commit("SET_PHONE_NUMBER", phoneNumber);
          commit("SET_AGE", age);

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken(); // must remove token first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
