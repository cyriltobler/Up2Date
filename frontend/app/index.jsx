import App from "./(app)"
import Auth from "./auth"
import React, {useContext, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import Context from '../components/Context';
import { router, Redirect  } from 'expo-router';
import * as AppleAuthentication from "expo-apple-authentication";
import {Text} from "react-native";

function Index(){
    const { credentials, setCredentials } = useContext(Context);
    const [loaded, setLoaded] = useState(false);

    async function getSession(){
        try{
            const credentialsJSON = await SecureStore.getItemAsync('user');
            if(!credentialsJSON) return;
            const credentials = JSON.parse(credentialsJSON)

            const credentialsState = await AppleAuthentication.getCredentialStateAsync(credentials.user)
            if(credentialsState !== 1){
                return console.log(credentialsState);
            }
            setCredentials(credentials);
        } catch (error) {
            console.error(error);
        } finally {
            setLoaded(true)
        }
    }
    useEffect(() => {
        getSession()
    }, [])
/*
    useEffect(() => {
        if (credentials) {
            router.replace('/(app)');
        }
    }, [credentials]);
*/
    if(!loaded){
        return(
            <Text>
                Loading...
            </Text>
        )
    }

    if(credentials){
        return(
            <Redirect href="/(app)" />
        )
    }

    return(
        <Auth/>
    )

}

export default Index;