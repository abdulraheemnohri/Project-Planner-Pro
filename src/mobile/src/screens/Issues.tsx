import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

const Issues = () => {
  const [issues] = useState([
    { id: 1024, title: 'Login API returning 500 error', type: 'bug', priority: 'critical', assignee: 'Developer' },
    { id: 1025, title: 'Add dark mode support', type: 'feature', priority: 'high', assignee: 'Designer' },
    { id: 1026, title: 'Improve performance', type: 'enhancement', priority: 'medium', assignee: '' },
  ]);

  const renderIssue = ({ item }) => (
    <TouchableOpacity style={styles.issueCard}>
      <View style={styles.issueHeader}>
        <View style={styles.issueId}>
          <Text style={styles.issueIdText}>#{item.id}</Text>
        </View>
        <View style={styles.issueType}>
          <Text style={styles.issueTypeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.issueTitle}>{item.title}</Text>
      <View style={styles.issueFooter}>
        <Text style={[styles.priorityText, { color: item.priority === 'critical' ? '#ef4444' : item.priority === 'high' ? '#f59e0b' : '#3b82f6' }]}>
          {item.priority}
        </Text>
        <Text style={styles.assignee}>{item.assignee || 'Unassigned'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Issues</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>New</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={issues}
        renderItem={renderIssue}
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
  issueCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  issueId: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  issueIdText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  issueType: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  issueTypeText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 8,
  },
  issueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  assignee: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default Issues;