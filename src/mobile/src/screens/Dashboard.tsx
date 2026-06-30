import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Dashboard = () => {
  const widgets = [
    { label: 'Total Projects', value: 0 },
    { label: 'Active Sprints', value: 0 },
    { label: 'Open Issues', value: 0 },
    { label: 'Team Members', value: 0 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome back! Here is your project overview.</Text>
      
      <View style={styles.widgetsContainer}>
        {widgets.map((widget, index) => (
          <View key={index} style={styles.widget}>
            <Text style={styles.widgetLabel}>{widget.label}</Text>
            <Text style={styles.widgetValue}>{widget.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
  },
  widgetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  widget: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    backgroundColor: '#1e293b',
    borderRadius: 12,
  },
  widgetLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  widgetValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
});

export default Dashboard;