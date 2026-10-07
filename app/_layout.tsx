import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTintColor: Colors.light.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: Colors.light.primary,
        }}
      >
        <Drawer.Screen 
          name="index" 
          options={{ 
            title: 'Ana Sayfa',
            drawerLabel: 'Ana Sayfa'
          }} 
        />
        <Drawer.Screen 
          name="archive" 
          options={{ 
            title: 'Geçmiş Çalışmalar',
            drawerLabel: 'Danışan Arşivi'
          }} 
        />
        <Drawer.Screen 
          name="analysis/[id]" 
          options={{ 
            title: 'Analiz Formu',
            drawerItemStyle: { display: 'none' } // Hide from sidebar
          }} 
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
