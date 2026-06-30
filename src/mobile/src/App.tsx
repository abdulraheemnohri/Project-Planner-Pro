import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './screens/Dashboard';
import Projects from './screens/Projects';
import Sprints from './screens/Sprints';
import Issues from './screens/Issues';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="Projects" component={Projects} options={{ title: 'Projects' }} />
            <Stack.Screen name="Sprints" component={Sprints} options={{ title: 'Sprints' }} />
            <Stack.Screen name="Issues" component={Issues} options={{ title: 'Issues' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;