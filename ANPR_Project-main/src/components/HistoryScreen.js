import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Platform } from 'react-native';

const HistoryScreen = ({ recentList, onBack, onSettings, styles, colors, tr }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredList = recentList.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => {
        const parts = item.split(' - ');
        const name = parts[0]?.trim() || tr.unknown;
        const logLane = parts[1]?.trim() || tr.noLaneDetected;

        return (
            <View style={styles.logItemRow}>
                <View style={styles.logNameContainer}>
                    <Text style={styles.logNameText} numberOfLines={1}>
                        • {name}
                    </Text>
                </View>
                <Text style={styles.logLaneText}>
                    {tr.laneId}: {logLane}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={styles.backButtonText}>{tr.back}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsIcon} onPress={onSettings}>
                <Text style={styles.settingsIconText}>⚙️</Text>
            </TouchableOpacity>

            <View style={[styles.container, { paddingTop: 80 }]}>
                <Text style={styles.settingsTitle}>{tr.history}</Text>

                <TextInput
                    style={styles.searchBar}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={tr.searchPlaceholder}
                    placeholderTextColor={colors.textSecondary}
                />

                <View style={[styles.logContainer, { maxHeight: '80%' }]}>
                    <FlatList
                        data={filteredList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.logContentContainer}
                        ListEmptyComponent={
                            <Text style={styles.logEmpty}>{tr.noDetections.replace('{query}', searchQuery)}</Text>
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HistoryScreen;
