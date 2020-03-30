import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '~/pages/Deliveries/Dashboard';
import Details from '~/pages/Deliveries/Details';
import PostProblem from '~/pages/Deliveries/PostProblem';
import ShowProblem from '~/pages/Deliveries/ShowProblem';
import Confirm from '~/pages/Deliveries/Confirm';

const Stack = createStackNavigator();

function headerLeftIcon(navigation, goHere) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(goHere)}>
      <Icon name="chevron-left" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

export default function Deliveries({ navigation }) {
  const cameraStatus = useSelector(state => state.user.cameraStatus);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
        headerTransparent: true,
        headerTintColor: '#fff',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Detalhes da encomenda',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => headerLeftIcon(navigation, 'Dashboard'),
        }}
      />
      <Stack.Screen
        name="PostProblem"
        component={PostProblem}
        options={{
          title: 'Informar problema',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => headerLeftIcon(navigation, 'Details'),
        }}
      />
      <Stack.Screen
        name="ShowProblem"
        component={ShowProblem}
        options={{
          title: 'Visualizar problemas',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => headerLeftIcon(navigation, 'Details'),
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerShown: !cameraStatus,
          title: 'Confirmar entrega',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerLeft: () => headerLeftIcon(navigation, 'Details'),
        }}
      />
    </Stack.Navigator>
  );
}

Deliveries.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
