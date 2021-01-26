import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
  // _isMounted = false;

  // state={
  //     orders: [],
  //     loading: true
  // }

  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);
  // componentDidMount() {
  //   this._isMounted = true;
  //   console.log('--- mounted in order.js--' + this._isMounted);
  //
  //   if(this._isMounted){
  //
  //   }
  //
  // }
  //
  // componentWillUnmount() {
  //   this._isMounted = false;
  //   console.log('--un mount orders.js--' + this._isMounted);
  // }


  let orders = <Spinner />;
  if(!props.loading){
    orders = props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ))
    };
  return(
    <div>
      {orders}
    </div>
  );

}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(orders, axios));
