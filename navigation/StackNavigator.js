import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import HomeScreen from '../screens/HomeScreen';
import BookScreen from '../screens/BookScreen';
import PlayScreen from '../screens/PlayScreen';
import ProfileScreen from '../screens/ProfileScreen';


const StackNavigator = () => {
const Stack = createNativeStackNavigator(); 
const Tab = createBottomTabNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="home" size={24} color="green" />
                            ) : (
                                <Ionicons name="home-outline" size={24} color="gray" />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Play"
                    component={PlayScreen}
                    options={{
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        tabBarLabel: 'Play',
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <AntDesign name="addusergroup" size={24} color="green" />
                            ) : (
                                <AntDesign name="addusergroup" size={24} color="gray" />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Book"
                    component={BookScreen}
                    options={{
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        tabBarLabel: 'Book',
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <SimpleLineIcons name="book-open" size={24} color="green" />
                            ) : (
                                <SimpleLineIcons name="book-open" size={24} color="gray" />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        tabBarLabel: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="person" size={24} color="green" />
                            ) : (
                                <Ionicons name="person-outline" size={24} color="gray" />
                            ),
                    }}
                />
            </Tab.Navigator>
        )
    }
    const AuthStack =() =>{
        return(
            <Stack.Navigator>

            </Stack.Navigator>
        )
    }
    function MainStack(){
        return(
            <Stack.Navigator>
                <Stack.Screen name="Main"
                 component={BottomTabs}
                 options={{ headerShown: false }}
                 />
            </Stack.Navigator>
        )
    }
    return (
       <NavigationContainer>
            <MainStack/>
        </NavigationContainer>
    );
};

export default StackNavigator;