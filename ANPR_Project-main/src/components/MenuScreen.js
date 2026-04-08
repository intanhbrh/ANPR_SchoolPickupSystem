import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Linking } from 'react-native';

const MenuScreen = ({ onNavigate, styles, colors, tr }) => {
    const menuItems = [
        { label: tr.dashboardTitle || "Live Dashboard", screen: 'Dashboard', icon: '📊' },
        { label: "My Profile", screen: 'Profile', icon: '👤' },
        { label: tr.history || "History", screen: 'History', icon: '📜' },
        { label: tr.appSettings || "Settings", screen: 'Settings', icon: '⚙️' },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { justifyContent: 'center', flex: 1, paddingHorizontal: 30 }]}>

                {/* Header */}
                <View style={[styles.header, { marginBottom: 50 }]}>
                    <Text style={[styles.schoolName, { fontSize: 26, marginBottom: 15, fontWeight: '900' }]}>{tr.schoolName}</Text>
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
                    <Text style={[styles.mainTitle, { marginTop: 20, fontSize: 32, fontWeight: 'bold', letterSpacing: 0.5 }]}>Main Menu</Text>
                </View>

                {/* Menu Items */}
                <View style={{ width: '100%' }}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: colors.card,
                                marginBottom: 18,
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: colors.border,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 18,
                                paddingHorizontal: 24,
                            }}
                            onPress={() => onNavigate(item.screen)}
                            activeOpacity={0.7}
                        >
                            <View style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
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
                        backgroundColor: colors.error,
                        marginTop: 40,
                        alignSelf: 'center',
                        paddingVertical: 14,
                        paddingHorizontal: 40,
                        borderRadius: 12,
                    }}
                    onPress={() => Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                    activeOpacity={0.8}
                >
                    <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' }}>Log Out</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default MenuScreen;
