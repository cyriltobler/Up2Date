import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {TouchableOpacity, Text, Button} from "react-native";

function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
            <Stack.Screen name="settings" options={{
                headerShown: true,
                title: 'Einstellungen',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#141414',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerBackTitleVisible: false
            }}/>
        </Stack>
    );
}

export default RootLayout;