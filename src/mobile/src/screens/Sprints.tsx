import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Plus, Rocket } from 'lucide-react-native';

const Sprints = ({ navigation }) => {
  const [sprints] = useState([
    { id: 1, name: 'Sprint 12', goal: 'Complete User Authentication', days: '5 / 14', status: 'active' },
    { id: 2, name: 'Sprint 11', goal: 'API Integration', days: '14 / 14', status: 'completed' },
    { id: 3, name: 'Sprint 13', goal: 'Mobile App', days: '0 / 14', status: 'planned' },
  ]);

  const renderSprint = ({ item }) => (
    <TouchableOpacity style={styles.sprintCard}>
      <View style={styles.sprintHeader}>
        <View style={styles.sprintIcon}>
          <Rocket size={18} color="#fff" />
        </View>
        <View style={styles.sprintInfo}>
          <Text style={styles.sprintName}>{item.name}</Text>
          <Text style={styles.sprintGoal}>{item.goal}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? '#10b981' : item.status === 'completed' ? '#06b6d4' : '#6b7280' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.sprintDays}>Day {item.days}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sprints</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>New</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sprints}
        renderItem={renderSprint}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  sprintCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sprintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sprintIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#334155',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sprintInfo: {
    flex: 1,
  },
  sprintName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
  },
  sprintGoal: {
    fontSize: 14,
    color: '#94a3b8',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
  },
  sprintDays: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default Sprints;