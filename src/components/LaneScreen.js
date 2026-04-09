import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';

const LaneScreen = ({ recentList, onBack, styles, colors, tr }) => {
    const [selectedLane, setSelectedLane] = useState('1');

    // Filter list based on selected lane
    // Assuming format: "Name - Lane X" or similar. 
    // The App.js logic constructs strings like `${name} - ${laneInfo}`
    // We need to check if the string contains the lane info.
    const filteredList = recentList.filter(item => {
        // Check for "Lane 1", "Lane 2", "Lane 3" in the string
        // Adjust matching logic if the format is different
        return item.includes(`Lane ${selectedLane}`) || item.includes(`Lane: ${selectedLane}`);
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { paddingTop: Platform.OS === 'android' ? 40 : 20 }]}>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Text style={styles.backButtonText}>{tr.back}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.mainTitle, { fontSize: 22, marginLeft: 10 }]}>Lane View</Text>
                </View>

                {/* Lane Tabs */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20 }}>
                    {['1', '2', '3'].map(lane => (
                        <TouchableOpacity
                            key={lane}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 30,
                                borderRadius: 20,
                                backgroundColor: selectedLane === lane ? colors.accent : colors.card,
                                borderWidth: 1,
                                borderColor: colors.border,
                            }}
                            onPress={() => setSelectedLane(lane)}
                        >
                            <Text style={{
                                color: selectedLane === lane ? '#FFF' : colors.textPrimary,
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>
                                Lane {lane}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* List */}
                <View style={[styles.logContainer, { flex: 1 }]}>
                    <ScrollView contentContainerStyle={styles.logContentContainer}>
                        {filteredList.length > 0 ? (
                            filteredList.map((item, index) => {
                                const parts = item.split(' - ');
                                const name = parts[0] || 'Unknown Name';
                                const lane = parts[1] || 'Unknown Lane';

                                return (
                                    <View key={index} style={styles.logItemRow}>
                                        <Text style={styles.logNameText}>
                                            • {name}
                                        </Text>
                                        <Text style={styles.logLaneText}>
                                            ({lane})
                                        </Text>
                                    </View>
                                );
                            })
                        ) : (
                            <Text style={styles.logEmpty}>No detections for Lane {selectedLane}</Text>
                        )}
                    </ScrollView>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default LaneScreen;
