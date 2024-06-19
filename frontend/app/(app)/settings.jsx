import {Button, Pressable, StyleSheet, Text, View} from "react-native"
import Context from "../../components/Context";
import * as SecureStore from 'expo-secure-store';
import {useContext} from "react";
import { router } from 'expo-router';
import * as AppleAuthentication from "expo-apple-authentication";

function Settings(options){
    const { credentials, setCredentials } = useContext(Context);

    async function logOut(){
        await setCredentials(false);
        const response = await fetch('http://10.80.4.184:3000/auth/logout', {
            method: 'DELETE',
            credentials: 'include',
        });
        if(response.ok){
            router.replace('/');
        }
    }
    return(
        <View style={styles.container}>
            <Pressable style={styles.logOutBtn} onPress={logOut}>
                <Text style={styles.logOutTxt}>Abmelden</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: "black",
    },
    logOutBtn: {
        backgroundColor: "#1C1C1E",
        height: 44,
        width: "90%",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logOutTxt: {
        fontSize: 17,
        color: "#FF3B30"
    }
})

export default Settings;