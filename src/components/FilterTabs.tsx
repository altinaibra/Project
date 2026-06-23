import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FilterType } from '../types';

interface Props {
  active: FilterType;
  onChange: (f: FilterType) => void;
  counts: Record<FilterType, number>;
}

const TABS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

export default function FilterTabs({ active, onChange, counts }: Props) {
  return (
    <View style={styles.row}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, active === tab.key && styles.tabActive]}
          onPress={() => onChange(tab.key)}
        >
          <Text style={[styles.label, active === tab.key && styles.labelActive]}>
            {tab.label} ({counts[tab.key]})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#6C63FF',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#777',
  },
  labelActive: {
    color: '#fff',
  },
});
