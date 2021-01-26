import React, { useState,useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error,setError] = useState(null)
    // state = {
    //   error: null
    // }


    const reqInterceptor = axios.interceptors.request.use(req => {
      // this.setState({error: null});
      setError(null)
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(res => res, err => {
      // this.setState({error: error});
      setError(err);
    });

    useEffect(() => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    }, [reqInterceptor,resInterceptor]);


    const errorConfirmedHandler = () => {
      // this.setState({error: null});
      setError(null);
    }


    return (
      <Auxiliary>
        <Modal
        show={error}
        modalClosed={errorConfirmedHandler} >
          {error ? error.message : null }
        </Modal>
        <WrappedComponent {...props} />
      </Auxiliary>
    );

  }
}

export default withErrorHandler;
