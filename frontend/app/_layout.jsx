import {Stack} from 'expo-router';
import React, {useState} from 'react';
import Context from '../components/Context';

function RootLayout() {
    const [userPreferences, setUserPreferences] = useState(null);

    return (
        <Context.Provider value={{userPreferences, setUserPreferences}}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(app)"/>
                <Stack.Screen name="index" options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name="auth" options={{
                    headerShown: false,
                }}/>
            </Stack>
        </Context.Provider>
    );
}

export default RootLayout;