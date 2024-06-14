import { Stack, Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Context from '../components/Context';

function RootLayout() {
    const [credentials, setCredentials] = useState(null);

    return (
        <Context.Provider value={{credentials, setCredentials}}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(app)"/>
                <Stack.Screen name="index" options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="auth" options={{
                    headerShown: false,
                }} />
            </Stack>
        </Context.Provider>
    );
}

export default RootLayout;