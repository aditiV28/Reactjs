import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index'

const burgerBuilder = props => {
  // constructor(props){
  //   super(props);
  //   this.state={}
  // }
  // _isMounted = false;
  //
  // state={
  //   purchasing: false
  // }

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);


  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      },0);

      // if(this._isMounted){
      return sum > 0;
      // }

  }

  // addIngredientHandler = (type) => {
  //   console.log('--addIngredientHandler--' + this._isMounted);
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   if(this._isMounted){
  //       this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   }
  //
  //   this.updatePurchaseState(updatedIngredients);
  // }
  //
  // removeIngredientHandler = (type) => {
  //   console.log('--removeIngredientHandler--' + this._isMounted);
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount <= 0){
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   if(this._isMounted){
  //       this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   }
  //
  //   this.updatePurchaseState(updatedIngredients);
  // }

  const purchaseHandler = () => {
    if(props.isAuthenticated){
        // this.setState({purchasing: true});
        setPurchasing(true);
    }else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }

  }

  const purchaseCancelHandler = () => {
    // this.setState({purchasing: false})
    setPurchasing(false);
  }



  const purchaseContinueHandler = () => {
    // const queryParams = [];
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');

    props.onInitPurchase();
    props.history.push('/checkout');

  }


  const disabledInfo = {
    ...props.ings
  };

  for(let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key] <=0
  }
  let orderSummary = null;
  let burger = props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;

  if(props.ings){
    burger = (
      <Auxiliary>
        <Burger ingredients={props.ings}/>
        <BuildControls
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
        disabled={disabledInfo}
        price={props.price}
        purchaseable={updatePurchaseState(props.ings)}
        ordered={purchaseHandler}
        isAuth={props.isAuthenticated} />
      </Auxiliary>
    );

    orderSummary = <OrderSummary
    ingredients={props.ings}
    purchaseCanceled={purchaseCancelHandler}
    purchaseContinued={purchaseContinueHandler}
    price={props.price}
     />
  }

  return(
    <Auxiliary>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
        {orderSummary}
      </Modal>
        {burger}
    </Auxiliary>
  );

}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
