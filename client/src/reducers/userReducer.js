import userSerivce from "../services/userService";

const userReducer = (userState = [], action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    case "CREATE_USER":
      return userState.concat(action.createdUser);
    case "DELETE_USER":
      return userState.filter(user => user.id !== action.id);
    case "UPDATE_USER":
      return userState.map(user =>
        user.id === action.updatedUser.id ? action.updatedUser : user
      );
    default:
      return userState;
  }
};

export const userInitializer = () => {
  return async dispatch => {
    const userDB = await userSerivce.getAll();
    // console.log(`User initalized:`, userDB);
    dispatch({
      type: "INIT_USER",
      data: userDB
    });
  };
};

export const createUser = userInfo => {
  return async dispatch => {
    const createdUser = await userSerivce.create(userInfo);
    // console.log(`User created:`, createdUser);
    dispatch({
      type: "CREATE_USER",
      createdUser
    });
  };
};

export const deleteUser = id => {
  return async dispatch => {
    await userSerivce.remove(id);
    dispatch({
      type: "DELETE_USER",
      id
    });
  };
};

export const updateUser = (id, newInfo) => {
  return async dispatch => {
    const updatedUser = await userSerivce.update(id, newInfo);
    dispatch({
      type: "UPDATE_USER",
      updatedUser
    });
  };
};

export default userReducer;
