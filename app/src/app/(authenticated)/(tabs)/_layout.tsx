import { useAuth } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import CustomHeader from '~/components/custom-header';
import { Colors } from '~/constants';

export default function Layout() {
  const {isSignedIn} = useAuth();
  const router = useRouter()

  if (!isSignedIn) {
    router.navigate('./access');
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint={'extraLight'}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

    </Tabs>
  );
};
