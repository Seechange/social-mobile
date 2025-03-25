
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '@/constants/themes';

export default function Tablayout() {

    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.white,
            tabBarStyle: {
                backgroundColor: "black",
                borderTopWidth: 0,
                height: 50,
                elevation: 0,
                position: "absolute",
                paddingBottom: 8,
            }
        }}>
            <Tabs.Screen name="index" options={{ tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color} /> }} />
            <Tabs.Screen name="bookmarks" options={{ tabBarIcon: ({ size, color }) => <FontAwesome name='bookmark' size={size} color={color} /> }} />
            <Tabs.Screen name="create" options={{ tabBarIcon: ({ size, color }) => <Ionicons name='create' size={size} color={COLORS.primary} /> }} />
            <Tabs.Screen name="notifications" options={{ tabBarIcon: ({ size, color }) => <MaterialIcon name='bell-ring' size={size} color={color} /> }} />
            <Tabs.Screen name="profile" options={{ tabBarIcon: ({ size, color }) => <FontAwesome name='user' size={size} color={color} /> }} />
        </Tabs>

    )
}

