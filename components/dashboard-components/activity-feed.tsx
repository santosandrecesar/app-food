'use client';

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const activities = [
  {
    id: '1',
    type: 'scan',
    title: 'Scanned Product',
    description: 'Organic Granola Bar',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'analysis',
    title: 'Analysis Complete',
    description: 'Greek Yogurt',
    time: '5 hours ago',
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'Healthy Choice Master',
    time: '1 day ago',
  },
];

export default function ActivityFeed() {
  const renderItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={
            item.type === 'scan' ? 'scan-outline' :
            item.type === 'analysis' ? 'analytics-outline' : 'trophy-outline'
          } 
          size={24} 
          color="#4CAF50" 
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={activities}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});