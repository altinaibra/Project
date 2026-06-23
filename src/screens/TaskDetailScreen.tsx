import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useTasks } from '../context/TaskContext';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { tasks, toggleTask, deleteTask } = useTasks();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Task not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const done = task.status === 'completed';

  const handleDelete = () => {
    Alert.alert('Delete Task', `Delete "${task.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.statusBanner, done ? styles.bannerDone : styles.bannerPending]}>
          <Text style={styles.statusText}>{done ? '✓ Completed' : '⏳ Pending'}</Text>
        </View>

        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Created</Text>
          <Text style={styles.metaValue}>
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <Text style={styles.descLabel}>Description</Text>
        <View style={styles.descBox}>
          <Text style={styles.descText}>{task.description || 'No description provided.'}</Text>
        </View>

        <TouchableOpacity
          style={[styles.btn, done ? styles.btnPending : styles.btnDone]}
          onPress={() => toggleTask(task.id)}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>
            {done ? 'Mark as Pending' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDelete} onPress={handleDelete} activeOpacity={0.85}>
          <Text style={styles.btnDeleteText}>Delete Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F4FB' },
  container: { padding: 20 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { color: '#aaa', fontSize: 16 },

  statusBanner: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  bannerPending: { backgroundColor: '#FFF3CD' },
  bannerDone: { backgroundColor: '#D4EDDA' },
  statusText: { fontSize: 14, fontWeight: '700', color: '#555' },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 16,
    lineHeight: 30,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  metaLabel: { fontSize: 13, color: '#999', fontWeight: '600' },
  metaValue: { fontSize: 13, color: '#444', fontWeight: '600' },

  descLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 28,
    minHeight: 80,
  },
  descText: { fontSize: 15, color: '#444', lineHeight: 22 },

  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnDone: {
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  btnPending: { backgroundColor: '#F0F0F5' },
  btnText: { fontSize: 15, fontWeight: '700', color: '#fff' },

  btnDelete: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    borderWidth: 1.5,
    borderColor: '#FFCCCC',
  },
  btnDeleteText: { fontSize: 15, fontWeight: '700', color: '#FF6B6B' },
});
