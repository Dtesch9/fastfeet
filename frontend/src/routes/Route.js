import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

import authLoginLayout from '~/pages/_layouts/authLogin';
import defaultLayout from '~/pages/_layouts/default';

export default function Routes({ component: Component, isPrivate, ...rest }) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard/packages" />;
  }

  const Layout = signed ? defaultLayout : authLoginLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} {...rest} />
        </Layout>
      )}
    />
  );
}

Routes.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

Routes.defaultProps = {
  isPrivate: false,
};
