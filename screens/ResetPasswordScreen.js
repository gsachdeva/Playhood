// ResetPasswordScreen.js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ResetPasswordForm from '../components/ResetPasswordForm';
import styles from '../styles/resetpasswordstyles'
import { useNavigation } from '@react-navigation/native';
const ResetPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

  const handleResetPassword = async (email, newPassword) => {
    if (!email || !newPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/resetpassword', {
        email,
        newPassword,
      });

      if (res.data.success) {
         Alert.alert('Success', res.data.message, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <ResetPasswordForm onSubmit={handleResetPassword} />
    </View>
  );
};

export default ResetPasswordScreen;
