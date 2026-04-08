import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ActivityIndicator, Image
} from 'react-native';

const SERVER_URL = 'http://10.252.2.107:3000';

const LoginScreen = ({ onLoginSuccess, styles, colors, tr }) => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    if (!email.endsWith('@kl.his.edu.my')) {
      setError('Please use your school email (@kl.his.edu.my)');
      return;
    }
    if (!fullname.trim()) {
      setError('Please enter your full name');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${SERVER_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullname }),
      });
      const data = await response.json();
      if (response.ok) {
        setStep('otp');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure you are on school WiFi.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${SERVER_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure you are on school WiFi.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.authContainer}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.schoolName}>HELP INTERNATIONAL SCHOOL</Text>
          <Image source={require('../../assets/icon.png')} style={styles.banner} />
          <Text style={styles.subheading}>ANPR Vehicle Verification System</Text>
        </View>

        {step === 'email' ? (
          <>
            <Text style={styles.instruction}>
              Enter your school email to receive a one-time login code.
            </Text>

            <TextInput
              style={styles.input}
              value={fullname}
              onChangeText={setFullname}
              placeholder="Full Name (e.g. Ahmad Ali)"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="words"
            />

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="School Email (e.g. ahmad@kl.his.edu.my)"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSendOtp}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Send OTP Code</Text>
              }
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.instruction}>
              Enter the 6-digit code sent to {email}
            </Text>

            <TextInput
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter OTP Code"
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
              maxLength={6}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>Verify & Login</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => { setStep('email'); setError(''); setOtp(''); }}
            >
              <Text style={{ color: colors.textSecondary }}>← Back to email</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;