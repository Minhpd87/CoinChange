import paymentService from "../services/paymentService";

const paymentReducer = (paymentState = [], action) => {
  switch (action.type) {
    case "GET_ALL": {
      return action.data;
    }
    case "CREATE_NEW": {
      return paymentState.concat(action.data);
    }
    case "DELETE_PAYMENT": {
      return paymentState.filter(item => item.id !== action.id);
    }
    case "UPDATE_PAYMENT": {
      return paymentState.map(item =>
        item.id === action.data.id ? action.data : item
      );
    }
    default:
      return paymentState;
  }
};

export const getAllPayment = () => {
  return async dispatch => {
    console.log(`test`);
    const paymentData = await paymentService.getAll();
    dispatch({
      type: "GET_ALL",
      data: paymentData
    });
  };
};

export const createPayment = paymentData => {
  return async dispatch => {
    const newPayment = await paymentService.create(paymentData);
    dispatch({
      type: "CREATE_NEW",
      data: newPayment
    });
  };
};

export const deletePayment = id => {
  return async dispatch => {
    await paymentService.remove(id);
    dispatch({
      type: "DELETE_PAYMENT",
      id
    });
  };
};

export const updatePayment = (id, data) => {
  return async dispatch => {
    const changedPayment = await paymentService.update(id, data);
    dispatch({
      type: "UPDATE_PAYMENT",
      data: changedPayment
    });
  };
};

export default paymentReducer;
