import {
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import styles from '../styles/loginstyles';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', { screen: 'Main' });
    }
  }, [token]);

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const user = { email, password };
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/login', user);
      const { token, success, message } = response.data;

      if (success) {
        await AsyncStorage.setItem('token', token);
        setToken(token);
        Alert.alert('Success', 'Login Successful');
      } else {
        Alert.alert('Error', message);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login to your account</Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError('');
        }}
        placeholder="Enter your email"
        placeholderTextColor="#BEBEBE"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError('');
        }}
        placeholder="Enter your password"
        placeholderTextColor="#BEBEBE"
        style={styles.input}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <Pressable onPress={validateForm} style={styles.button}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Register')}
        style={{ marginTop: 20, alignItems: 'center' }}
      >
        <Text style={styles.screenlabel}>Don't have an account? Register</Text>
      </Pressable>

      <Pressable>
        <Text
          style={styles.screenlabel}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Forgot Password?
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
