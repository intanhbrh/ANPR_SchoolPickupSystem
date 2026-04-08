// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import all resources
import en from './translations/en.json';
import ms from './translations/ms.json';
import zh from './translations/zh.json';
import ko from './translations/ko.json';

const resources = {
  en: { translation: en.translation },
  ms: { translation: ms.translation },
  zh: { translation: zh.translation },
  ko: { translation: ko.translation },
};

// 1. Custom Language Detector for AsyncStorage persistence
const languageDetector = {
  type: 'languageDetector',
  async: true,

  detect: async (callback) => {
    try {
      const storedLanguage = await AsyncStorage.getItem('user-language');
      // If we find a stored language, use it. Otherwise, default to 'en'.
      return callback(storedLanguage || 'en');
    } catch (error) {
      console.error('Error reading language from AsyncStorage:', error);
      return callback('en');
    }
  },

  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    compatibilityJSON: 'v3', // Required for React Native
    interpolation: {
      escapeValue: false, // React already prevents XSS
    },
    // Only allow supported languages to avoid crashes
    supportedLngs: ['en', 'ms', 'zh', 'ko'],
    // This setting ensures i18next re-renders when the language changes
    react: {
      useSuspense: false,
    }
  });

export default i18n;