import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Linking, ScrollView } from 'react-native';

const MenuScreen = ({ onNavigate, styles, colors, tr }) => {
    const menuItems = [
        { label: tr.dashboardTitle || "Live Dashboard", screen: 'Dashboard', icon: '📊' },
        { label: "My Profile", screen: 'Profile', icon: '👤' },
        { label: tr.history || "History", screen: 'History', icon: '📜' },
        { label: tr.appSettings || "Settings", screen: 'Settings', icon: '⚙️' },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={[styles.container, { flex: 1, paddingHorizontal: 20, paddingTop: 20 }]}>

                {/* Header */}
                <View style={[styles.header, { marginBottom: 20 }]}>
                    <Text style={[styles.schoolName, { fontSize: 22, marginBottom: 15, fontWeight: '900', textAlign: 'center', flexWrap: 'wrap' }]}>{tr.schoolName}</Text>
                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 8,
                        borderRadius: 50,
                    }}>
                        <Image source={require("../../assets/help-logo.png")} style={[styles.banner, { width: 90, height: 90, borderRadius: 45 }]} />
                    </View>
                    <Text style={[styles.mainTitle, { marginTop: 20, fontSize: 29, fontWeight: 'bold', letterSpacing: 0.5 }]}>Main Menu</Text>
                </View>

                {/* Menu Items */}
                <View style={{ width: '100%' }}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: colors.card,
                                marginBottom: 12,
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: colors.border,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 15,
                                paddingHorizontal: 23,
                            }}
                            onPress={() => onNavigate(item.screen)}
                            activeOpacity={0.7}
                        >
                            <View style={{
                                width: 48,
                                height: 48,
                                borderRadius: 20,
                                backgroundColor: colors.accent + '20',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 16,
                            }}>
                                <Text style={{ fontSize: 26 }}>{item.icon}</Text>
                            </View>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: colors.textPrimary,
                                flex: 1,
                            }}>{item.label}</Text>
                            <Text style={{ fontSize: 20, color: colors.textSecondary }}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Log Out Button */}
                <TouchableOpacity
                    style={{
                         backgroundColor: '#fc7f78ff',
                          marginTop: 30,
                          alignSelf: 'center',
                          paddingVertical: 14,
                          paddingHorizontal: 40, 
                          borderRadius: 12,
                          borderWidth: 2,
                          borderColor: '#fc7f78ff',
}}
        onPress={() => onNavigate('Logout')}
                    activeOpacity={0.8}
                >
                    <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: 'bold', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 2 }}>Log Out</Text>
                </TouchableOpacity>

            </View>
    
</ScrollView>
</SafeAreaView>
    );
};

export default MenuScreen;
