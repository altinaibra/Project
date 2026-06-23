import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
  advice: string | null;
  loading: boolean;
}

export default function AdviceCard({ advice, loading }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>💡 Daily Advice</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#6C63FF" />
      ) : advice ? (
        <Text style={styles.text}>"{advice}"</Text>
      ) : (
        <Text style={styles.text}>Stay focused and keep going!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EEF0FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C63FF',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  text: {
    fontSize: 13,
    color: '#444',
    fontStyle: 'italic',
    lineHeight: 19,
  },
});
