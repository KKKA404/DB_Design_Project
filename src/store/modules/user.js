import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import service from "@/plugins/axios";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    roles: [],
  };
};

const state = {
  token: getToken(),
  name: "",
  roles: [],
};

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, passWord } = userInfo;
    return new Promise((resolve, reject) => {
      service
        .post("/user/login", { userName: userName.trim(), passWord: passWord })
        .then((res) => {
          const { token } = res;

          commit("SET_TOKEN", token);
          setToken(token);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      service
        .get("/user/info", { params: { token: state.token } })
        .then((res) => {
          console.log("aaa");
          const { data } = res;

          console.log("getInfoRes", data);

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          console.log("data.roles", data.roles);

          const { roles, name } = data;
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      service
        .post("/user/logout", state.token)
        .then((res) => {
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
