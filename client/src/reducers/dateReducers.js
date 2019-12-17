import dateService from "../services/dateService";

const dateReducer = (dateState = [], action) => {
  switch (action.type) {
    case "GET_ALL_DATE": {
      return action.data;
    }
    case "CREATE_NEW_DATE": {
      return dateState.concat(action.data);
    }
    case "DELETE_DATE": {
      return dateState.filter(item => item.id !== action.id);
    }
    // case "UPDATE_date": {
    //   return dateState.map(item =>
    //     item.id === action.data.id ? action.data : item
    //   );
    // }
    default:
      return dateState;
  }
};

export const getAllDate = () => {
  return async dispatch => {
    const dateData = await dateService.getAll();
    dispatch({
      type: "GET_ALL_DATE",
      data: dateData
    });
  };
};

export const createDate = dateData => {
  return async dispatch => {
    const newdate = await dateService.create(dateData);
    dispatch({
      type: "CREATE_NEW_DATE",
      data: newdate
    });
  };
};

export const deleteDate = id => {
  return async dispatch => {
    await dateService.remove(id);
    dispatch({
      type: "DELETE_DATE",
      id
    });
  };
};

// export const updatedate = (id, data) => {
//   return async dispatch => {
//     const changeddate = await dateService.update(id, data);
//     dispatch({
//       type: "UPDATE_date",
//       data: changeddate
//     });
//   };
// };

export default dateReducer;
