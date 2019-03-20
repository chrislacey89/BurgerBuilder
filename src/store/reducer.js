import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // this clone goes even deeper to access ingredients
          ...state.ingredients,
          // [whatever we receive as a payload of the action will receive a new value]
          // with : we set the new value
          [action.ingredientName]: state.ingredients[action.ingredientName + 1]
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // this clone goes even deeper to access ingredients
          ...state.ingredients,
          // [whatever we receive as a payload of the action will receive a new value]
          // with : we set the new value
          [action.ingredientName]: state.ingredients[action.ingredientName - 1]
        }
      };
    default:
      return state;
  }
};

export default reducer;
