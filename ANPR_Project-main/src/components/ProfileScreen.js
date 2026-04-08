import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const ProfileScreen = ({ userName, userEmail, onBack, onSettings, styles, colors, tr }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { paddingTop: 50 }]}>

                <TouchableOpacity style={styles.settingsIcon} onPress={onSettings}>
                    <Text style={styles.settingsIconText}>⚙️</Text>
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Text style={styles.backButtonText}>{tr.back}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.mainTitle, { textAlign: 'center', width: '100%' }]}>My Profile</Text>
                </View>

                <View style={[styles.card, { width: '90%', padding: 20, marginTop: 30, backgroundColor: colors.card, borderRadius: 15, borderWidth: 1, borderColor: colors.border }]}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                            <Text style={{ fontSize: 40 }}>👤</Text>
                        </View>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.textPrimary }}>{userName || "Guest User"}</Text>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 5 }}>School Email</Text>
                        <Text style={{ fontSize: 18, color: colors.textPrimary, fontWeight: '500' }}>{userEmail || "Not provided"}</Text>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 5 }}>Role</Text>
                        <Text style={{ fontSize: 18, color: colors.textPrimary, fontWeight: '500' }}>Parent / Guardian</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
