import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const heartRateInfo = {
  20: { zone: [85, 170], max: 200 },
  30: { zone: [88, 162], max: 190 },
  35: { zone: [88, 157], max: 185 },
  40: { zone: [88, 153], max: 180 },
  45: { zone: [88, 149], max: 175 },
  50: { zone: [85, 145], max: 170 },
  55: { zone: [83, 140], max: 165 },
  60: { zone: [80, 136], max: 160 },
  65: { zone: [78, 132], max: 155 },
  70: { zone: [75, 128], max: 150 },
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [age, setAge] = useState('');
  const [userHeartRate, setUserHeartRate] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});

  const handleLogin = () => {
    if (username === userCredentials.username && password === userCredentials.password) {
      setLoggedIn(true);
    } else {
      Alert.alert('Invalid credentials', 'Please enter correct username and password!');
    }
  };

  const handleRegister = () => {
    if (newUsername && newPassword) {
      setUserCredentials({
        username: newUsername,
        password: newPassword,
      });
      Alert.alert('Registration Successful', 'You can now login with your new credentials.');
      setNewUsername('');
      setNewPassword('');
    } else {
      Alert.alert('Invalid Input', 'Please fill in both fields.');
    }
  };

  const handleHeartRateCheck = () => {
    if (userHeartRate && age) {
      checkHeartRate(parseInt(userHeartRate), parseInt(age));
    } else {
      Alert.alert('Invalid Input', 'Please enter your age and heart rate.');
    }
  };

  const checkHeartRate = (heartRate, age) => {
    const ageGroup = Object.keys(heartRateInfo).find(key => age >= key && age < key + 10) || 70;
    const { zone, max } = heartRateInfo[ageGroup];

    let message = `Your current heart rate is ${heartRate} bpm. `;
    if (heartRate < zone[0]) {
      message += 'Your heart rate is below the average for your age. It is recommended to see a doctor.';
    } else if (heartRate > zone[1]) {
      message += 'Your heart rate is above the average for your age. It is recommended to see a doctor.';
    } else {
      message += 'Your heart rate is within the normal range for your age.';
    }
    Alert.alert('Heart Rate Information', message);
  };

  const handleSignOut = () => {
    setUsername('');
    setPassword('');
    setUserHeartRate('');
    setAge('');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login or Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <TextInput
          style={styles.input}
          placeholder="Set Username"
          value={newUsername}
          onChangeText={setNewUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Set Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your heart rate (bpm)"
        keyboardType="numeric"
        value={userHeartRate}
        onChangeText={setUserHeartRate}
      />
      <TouchableOpacity onPress={handleHeartRateCheck} style={styles.button}>
        <Text style={styles.buttonText}>Check Heart Rate</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default App;
