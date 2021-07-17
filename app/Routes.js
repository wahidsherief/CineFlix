import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

/* Developer Comment: Screens of the App */

import Login from './screens/LoginScreen';
import Logout from './screens/LogoutScreen';
import Home from './screens/HomeScreen';
import Favorites from './screens/FavoritesScreen';


const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();


/* Developer Comment: Bottom Tabs in HomeScreen */
function BottomTabs() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Icon name="film" color="black" size={25} />
                    )
                }}
            />
            <BottomTab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: () => (
                        <Icon name="heart-o" color="black" size={25} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Logout"
                component={Logout}
                options={{
                    tabBarIcon: () => (
                        <Icon name="sign-out" color="black" size={25} />
                    ),
                }}
            />

        </BottomTab.Navigator>
    );
}

/* Developer Comment: App Screen on Stack */
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerTransparent: true,
                        headerTitle: ''
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={BottomTabs}
                    options={{
                        title: 'Movies',
                        tabBarLabel: 'Movies'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default App;
