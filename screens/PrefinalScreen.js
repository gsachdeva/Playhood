import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { getRegistrationProcess } from '../registrationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const PreFinalScreen = () => {
  const navigation = useNavigation();
  const { token, setToken } = useContext(AuthContext);
  const [userData, setUserData] = useState();


  useEffect(() => {
    getAllScreenData();
  }, []);
  const getAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      let userData = {};
      for (const screenName of screens) {
        const screenData = await getRegistrationProcess(screenName);
        if (screenData) {
          userData = { ...userData, ...screenData };
        }
      }
      setUserData(userData);
      console.log('user', userData);
    } catch (error) {
      console.log('error', error);
    }
  };
  const registerUser = async () => {
    try {
      const response = await axios
        .post('http://localhost:8000/register', userData)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          console.log('token', token);
          AsyncStorage.setItem('token', token);
          setToken(token);
        });

      clearAllScreenData();
    } catch (error) {
      console.log('Error', error);
    }
  };
  console.log('token', token);
  const clearAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];

      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }

      console.log('All screen data cleared!');
    } catch (error) {
      console.log('Error', error);
    }
  };

  console.log(userData);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 80 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}
        >
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            marginTop: 10,
          }}
        >
          Setting up your profile for you
        </Text>
      </View>

      <Pressable
        onPress={registerUser}
        style={{ backgroundColor: '#03C03C', padding: 15, marginTop: 'auto' }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}
        >
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({});
