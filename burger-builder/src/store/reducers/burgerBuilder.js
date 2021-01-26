import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  veggie_patty: 0.7
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
    const updatedIngredient = {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
      ingredients: updatedIngredients,
        //payload passed on the action not an array
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      building: true
    }
    return updateObject(state,updatedState);

    case actionTypes.REMOVE_INGREDIENT:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          //payload passed on the action not an array
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1 //value in the state - 1 removed
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }

};

export default reducer;
