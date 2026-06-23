import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress: () => void;
}

export default function TaskItem({ task, onToggle, onDelete, onPress }: Props) {
  const done = task.status === 'completed';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <TouchableOpacity style={[styles.checkbox, done && styles.checkboxDone]} onPress={onToggle}>
        {done && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, done && styles.titleDone]} numberOfLines={1}>
          {task.title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {task.description || 'No description'}
        </Text>
        <Text style={styles.date}>{new Date(task.createdAt).toLocaleDateString()}</Text>
      </View>

      <View style={[styles.badge, done ? styles.badgeDone : styles.badgePending]}>
        <Text style={styles.badgeText}>{done ? 'Done' : 'Pending'}</Text>
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete} hitSlop={8}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 12,
    color: '#777',
  },
  date: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  badgePending: {
    backgroundColor: '#FFF3CD',
  },
  badgeDone: {
    backgroundColor: '#D4EDDA',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555',
  },
  deleteBtn: {
    padding: 4,
  },
  deleteText: {
    color: '#ccc',
    fontSize: 16,
  },
});
