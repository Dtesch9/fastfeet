import React from 'react';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Deliveries from './Tabs';

import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function tabBarIconReorder({ color }) {
  return (
    <Icon style={{ marginTop: 10 }} name="reorder" size={24} color={color} />
  );
}

function tabBarIconAccount({ color }) {
  return (
    <Icon
      style={{ marginTop: 10 }}
      name="account-circle"
      size={24}
      color={color}
    />
  );
}

export default function createRoutes(isSigned = false, cameraStatus = false) {
  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999999',
        style: {
          height: 70,
          borderTopColor: '#00000026',
          borderTopWidth: 2,
        },
        keyboardHidesTabBar: true,
        labelStyle: {
          fontSize: 14,
          flex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Deliveries"
        component={Deliveries}
        options={({ route: { state: { index } = { index: null } } }) => {
          return {
            tabBarVisible: !(index === 2 && cameraStatus),
            unmountOnBlur: true,
            tabBarLabel: 'Entregas',
            tabBarIcon: tabBarIconReorder,
            tabBarButton: props => (
              <RectButton rippleColor="#7D9987" {...props} />
            ),
          };
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: tabBarIconAccount,
          tabBarButton: props => (
            <RectButton rippleColor="#7D9987" {...props} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

tabBarIconReorder.propTypes = {
  color: PropTypes.string.isRequired,
};

tabBarIconAccount.propTypes = {
  color: PropTypes.string.isRequired,
};
