// ResetPasswordForm.js
import React, { useState } from 'react';
import { TextInput, View, Button, Text, Pressable } from 'react-native';
import styles from '../styles/resetpasswordstyles';

const ResetPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        secureTextEntry
      />

      <Pressable
        style={styles.button}
        disabled={!email || !newPassword}
        onPress={() => onSubmit(email, newPassword)}>
        <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>
      
    </View>
  );
};

export default ResetPasswordForm;
