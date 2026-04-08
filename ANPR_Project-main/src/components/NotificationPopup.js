import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native';

const NotificationPopup = ({ visible, message, type = 'info', onHide, styles: themeStyles, colors }) => {
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Slide down and fade in
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: Platform.OS === 'ios' ? 60 : 40, // Adjust top position based on OS
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto-hide after 3 seconds
            const timer = setTimeout(() => {
                handleHide();
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            handleHide();
        }
    }, [visible]);

    const handleHide = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onHide && visible) onHide();
        });
    };

    if (!visible) return null;

    // Determine background color based on type
    let backgroundColor = colors.card;
    let icon = 'ℹ️';
    let textColor = colors.textPrimary;

    if (type === 'success') {
        backgroundColor = colors.accent; // Use accent color for success
        icon = '✅';
        textColor = '#FFFFFF';
    } else if (type === 'error') {
        backgroundColor = colors.error;
        icon = '⚠️';
        textColor = '#FFFFFF';
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY: slideAnim }],
                    opacity: opacityAnim,
                    backgroundColor: backgroundColor,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 10,
                    borderColor: colors.border,
                    borderWidth: type === 'info' ? 1 : 0,
                }
            ]}
        >
            <TouchableOpacity style={styles.content} onPress={handleHide} activeOpacity={0.9}>
                <Text style={styles.icon}>{icon}</Text>
                <Text style={[styles.message, { color: textColor }]}>
                    {message}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        zIndex: 10000,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        fontSize: 20,
        marginRight: 12,
    },
    message: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
});

export default NotificationPopup;
