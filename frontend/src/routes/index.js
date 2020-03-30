import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Package from '~/pages/Package';
import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';
import Problem from '~/pages/Problem';
import PackageForm from '~/pages/Package/PackageForm';
import DeliverymanForm from '~/pages/Deliveryman/DeliverymanForm';
import RecipientForm from '~/pages/Recipient/RecipientForm';

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />

      {/*= == Packages === */}
      <Route exact path="/dashboard/packages" component={Package} isPrivate />
      <Route
        exact
        path="/dashboard/packages/create"
        component={PackageForm}
        isPrivate
      />
      <Route
        exact
        path="/dashboard/packages/edit"
        component={PackageForm}
        isPrivate
        isEdit
      />

      {/*= == Deliveries === */}
      <Route
        exact
        path="/dashboard/deliveries"
        component={Deliveryman}
        isPrivate
      />
      <Route
        exact
        path="/dashboard/deliveries/create"
        component={DeliverymanForm}
        isPrivate
      />
      <Route
        exact
        path="/dashboard/deliveries/edit"
        component={DeliverymanForm}
        isPrivate
        isEdit
      />

      {/*= == Recipients === */}
      <Route
        exact
        path="/dashboard/recipients"
        component={Recipient}
        isPrivate
      />
      <Route
        exact
        path="/dashboard/recipients/create"
        component={RecipientForm}
        isPrivate
      />
      <Route
        exact
        path="/dashboard/recipients/edit"
        component={RecipientForm}
        isPrivate
        isEdit
      />

      {/*= == Problems === */}
      <Route exact path="/dashboard/problems" component={Problem} isPrivate />
    </Switch>
  );
}
