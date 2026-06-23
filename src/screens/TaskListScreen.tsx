import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useTasks } from '../context/TaskContext';
import { useAdvice } from '../hooks/useAdvice';
import { FilterType } from '../types';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import AdviceCard from '../components/AdviceCard';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const { advice, loading } = useAdvice();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const counts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    }),
    [tasks],
  );

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => filter === 'all' || t.status === filter)
      .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
  }, [tasks, filter, search]);

  const handleDelete = (id: string, title: string) => {
    Alert.alert('Delete Task', `Delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTask(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <AdviceCard advice={advice} loading={loading} />
        <SearchBar value={search} onChange={setSearch} />
        <FilterTabs active={filter} onChange={setFilter} counts={counts} />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => handleDelete(item.id, item.title)}
              onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              message={
                search
                  ? `No tasks match "${search}".`
                  : filter !== 'all'
                  ? `No ${filter} tasks.`
                  : undefined
              }
            />
          }
          contentContainerStyle={filtered.length === 0 ? styles.emptyList : undefined}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddTask')}
          activeOpacity={0.85}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F4FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  emptyList: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 32,
  },
});
