import React, {useContext, useEffect} from "react";
import {router} from 'expo-router';
import {Text, View} from "react-native";
import Context from "../components/Context";
import config from "../constants/config";

function Index() {
    const {setUserPreferences} = useContext(Context);

    async function getSession() {
        const response = await fetch(`${config.api.host}/auth`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.status === 401) return router.replace('auth')

        const {user} = await response.json();

        if (!user.language) return router.replace('language')
        setUserPreferences({
            language: user.language,
        })
        router.replace('(app)')
    }

    useEffect(() => {
        getSession()
    }, []);

    return (
        <View>
            <Text>
                Loading...
            </Text>
        </View>
    )
}


export default Index;