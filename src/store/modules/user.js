import { getToken, setToken, removeToken } from "@/utils/auth";
import service from "@/plugins/axios";
const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    // roles: []
  };
};

const state = getDefaultState();

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
  // SET_ROLES: (state, roles) => {
  //   state.roles = roles
  // }
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

  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token)
  //       .then((response) => {
  //         const { data } = response;

  //         if (!data) {
  //           reject("Verification failed, please Login again.");
  //         }

  //         const { roles, name, avatar } = data;

  //         // roles must be a non-empty array
  //         if (!roles || roles.length <= 0) {
  //           reject("getInfo: roles must be a non-null array!");
  //         }

  //         commit("SET_ROLES", roles);
  //         commit("SET_NAME", name);
  //         commit("SET_AVATAR", avatar);
  //         resolve(data);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      service
        .post("/user/logout", state.token)
        .then((res) => {
          removeToken(); // must remove token first
          // resetRouter();
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
