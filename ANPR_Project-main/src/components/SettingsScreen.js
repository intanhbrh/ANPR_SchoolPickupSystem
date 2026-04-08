import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' }
];

const SettingsScreen = ({ isDarkMode, toggleDarkMode, navigateBack, styles, switchColors }) => {
    const { t, i18n } = useTranslation();

    // Fallback if switchColors is missing
    const colors = switchColors || { textSecondary: '#666', accent: '#00A389', textPrimary: '#000' };

    const handleLanguageChange = (langCode) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
                <Text style={styles.backButtonText}>{t('back')}</Text>
            </TouchableOpacity>

            <View style={styles.settingsView}>
                <Text style={styles.settingsTitle}>{t('appSettings')}</Text>

                {/* Dark Mode Toggle Setting */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>{t('darkMode')}</Text>
                    <Switch
                        trackColor={{ false: colors.textSecondary, true: colors.accent }}
                        thumbColor={isDarkMode ? colors.textPrimary : '#FFFFFF'}
                        onValueChange={toggleDarkMode}
                        value={isDarkMode}
                    />
                </View>

                {/* Language Selection Setting */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>
                        {t('language')}
                    </Text>
                    <View style={styles.languageButtonContainer}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonScrollView}>

                            {LANGUAGES.map((lang) => (
                                <TouchableOpacity
                                    key={lang.code}
                                    style={[
                                        styles.languageButton,
                                        i18n.language === lang.code && styles.languageButtonActive
                                    ]}
                                    onPress={() => handleLanguageChange(lang.code)}
                                >
                                    <Text style={[
                                        styles.languageButtonText,
                                        i18n.language === lang.code && styles.languageButtonTextActive
                                    ]}>{lang.code === 'en' ? 'EN' : lang.code === 'zh' ? '中文' : lang.code === 'ko' ? 'KR' : 'ML'}</Text>
                                </TouchableOpacity>
                            ))}

                        </ScrollView>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;
