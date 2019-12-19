import loginService from "../services/loginService";
import userService from "../services/userService";

const loginReducer = (loginState = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.loggedInData;
    case "SET_USER":
      return action.currentUser;
    default:
      return loginState;
  }
};

export const login = credentials => {
  return async dispatch => {
    const loggedInData = await loginService.login(credentials);
    if (loggedInData !== "error") {
      dispatch({
        type: "LOGIN_USER",
        loggedInData
      });
    }
    return;
  };
};

export const setUser = loggedInData => {
  return async dispatch => {
    const userDB = await userService.getAll();
    // console.log(loggedInData);
    const currentUser = await userDB.find(
      user => user.username === loggedInData.username
    );
    if (currentUser) {
      // console.log(currentUser);
      dispatch({
        type: "SET_USER",
        currentUser
      });
    } else {
      dispatch({
        type: "SET_USER",
        currentUser: null
      });
    }
  };
};

export default loginReducer;
