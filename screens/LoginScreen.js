import { SafeAreaView, View } from 'react-native';
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
