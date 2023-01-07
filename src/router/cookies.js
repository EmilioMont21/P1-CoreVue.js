import Cookies from "js-cookie";

export default {
    setUserLogged(userLogged) {
      Cookies.set("userLogged", userLogged);
    },
    getUserLogged() {
      return Cookies.get("userLogged");
    },

    setUserRol(userRol) {
      Cookies.set("userRol", userRol);
    },
    getUserRol() {
      return Cookies.get("userRol");
    },

    setUserDep(userDep) {
      Cookies.set("userDep", userDep);
    },
    getUserDep() {
      return Cookies.get("userDep");
    },

    setUserId(userId) {
      Cookies.set("userId", userId);
    },
    getUserId() {
      return Cookies.get("userId");
    },
  };