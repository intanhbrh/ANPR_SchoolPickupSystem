import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView,
  ScrollView, ActivityIndicator, Platform
} from 'react-native';
import { SERVER_URL } from '../config';


const ParentScreen = ({ parentUser, lane, onLogout, styles, colors, isDarkMode }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifying, setNotifying] = useState(null); // which child is being notified
  const [notified, setNotified] = useState({}); // track which children were notified

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/parent-children/${encodeURIComponent(parentUser.email)}`);
      const data = await res.json();
      setChildren(data);
    } catch (err) {
      console.error("Failed to fetch children:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImHere = async (childName) => {
    setNotifying(childName);
    try {
      await fetch(`${SERVER_URL}/parent-notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parentUser.fullname,
          childName,
          lane: lane || 'the pickup zone',
        }),
      });
      setNotified(prev => ({ ...prev, [childName]: true }));
    } catch (err) {
      console.error("Failed to notify:", err);
    } finally {
      setNotifying(null);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' }]}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: Platform.OS === 'android' ? 40 : 60 }}>

        {/* Header */}
        <Text style={{
          fontSize: 13,
          fontWeight: '600',
          color: '#00A389',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 4,
        }}>
          HELP International School
        </Text>

        <Text style={{
          fontSize: 26,
          fontWeight: '900',
          color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
          marginBottom: 4,
        }}>
          Welcome,
        </Text>

        <Text style={{
          fontSize: 20,
          fontWeight: '700',
          color: '#00A389',
          marginBottom: 6,
        }}>
          {parentUser.fullname}
        </Text>

        <Text style={{
          fontSize: 14,
          color: isDarkMode ? '#AAAAAA' : '#666666',
          marginBottom: 30,
        }}>
          {parentUser.email}
        </Text>

        {/* Lane info if available */}
        {lane && lane !== 'Pending...' && (
          <View style={{
            backgroundColor: isDarkMode ? '#1A3A34' : '#E6F3F1',
            borderRadius: 12,
            padding: 14,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#00A389',
          }}>
            <Text style={{ fontSize: 13, color: '#00A389', fontWeight: '600' }}>
              📍 Current Active Lane: {lane}
            </Text>
          </View>
        )}

        {/* Children Section */}
        <Text style={{
          fontSize: 18,
          fontWeight: '800',
          color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
          marginBottom: 16,
        }}>
          Your Children
        </Text>

        {loading ? (
          <ActivityIndicator color="#00A389" size="large" style={{ marginTop: 30 }} />
        ) : children.length === 0 ? (
          <View style={{
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FAFAFA',
            borderRadius: 12,
            padding: 20,
            borderWidth: 1,
            borderColor: isDarkMode ? '#333333' : '#EFEFEF',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 16, color: isDarkMode ? '#AAAAAA' : '#666666', textAlign: 'center' }}>
              No children linked to this account yet.{'\n'}
            </Text>
          </View>
        ) : (
          children.map((child, index) => (
            <View key={index} style={{
              backgroundColor: isDarkMode ? '#1E1E1E' : '#FAFAFA',
              borderRadius: 16,
              padding: 20,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: notified[child.fullname]
                ? '#00A389'
                : isDarkMode ? '#333333' : '#EFEFEF',
            }}>
              {/* Child info */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#00A38920',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}>
                  <Text style={{ fontSize: 22 }}>👤</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 17,
                    fontWeight: '700',
                    color: isDarkMode ? '#FFFFFF' : '#1A1A1A',
                  }}>
                    {child.fullname}
                  </Text>
                  {child.plate_number && (
                    <Text style={{
                      fontSize: 13,
                      color: isDarkMode ? '#AAAAAA' : '#666666',
                      marginTop: 2,
                    }}>
                      🚗 {child.plate_number}
                    </Text>
                  )}
                </View>
              </View>

              {/* Notified status or button */}
              {notified[child.fullname] ? (
                <View style={{
                  backgroundColor: '#E6F3F1',
                  borderRadius: 10,
                  padding: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#00A389',
                }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#00A389' }}>
                    ✅ {child.fullname} has been notified!
                  </Text>
                  <Text style={{ fontSize: 12, color: '#00A389', marginTop: 4 }}>
                    They know you're at {lane || 'the pickup zone'}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: notifying === child.fullname ? '#AAAAAA' : '#00A389',
                    borderRadius: 10,
                    paddingVertical: 13,
                    alignItems: 'center',
                  }}
                  onPress={() => handleImHere(child.fullname)}
                  disabled={notifying === child.fullname}
                  activeOpacity={0.8}
                >
                  {notifying === child.fullname ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
                      🚗 I'm Here! Notify {child.fullname.split(' ')[0]}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ))
        )}

        {/* Logout */}
        <TouchableOpacity
          style={{
            backgroundColor: '#fc7f78',
            marginTop: 20,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: 'center',
          }}
          onPress={onLogout}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ParentScreen;
