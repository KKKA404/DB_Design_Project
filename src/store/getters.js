const getters = {
  token: (state) => state.user.token,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  phoneNumber: (state) => state.user.phoneNumber,
  age: (state) => state.user.age,
  gender: (state) => (state.user.gender === 1 ? "男" : "女"),
  permission_routes: (state) => state.permission.routes,
};
export default getters;
