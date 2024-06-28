import {Pressable, StyleSheet, Text, View} from "react-native"
import {router} from 'expo-router';
import config from "../../constants/config";

function Settings() {
    async function logOut() {
        const response = await fetch(`${config.api.host}/auth/logout`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (response.ok) {
            router.replace('auth');
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.btn} onPress={() => router.push('language')}>
                <Text style={styles.normalBtnText}>Sprache wählen</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={logOut}>
                <Text style={styles.deleteBtnText}>Abmelden</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "black",

        paddingTop: 20,
    },
    btn: {
        backgroundColor: "#1C1C1E",
        height: 44,
        width: "90%",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    normalBtnText: {
        fontSize: 17,
        color: "#007AFF"
    },
    deleteBtnText: {
        fontSize: 17,
        color: "#FF3B30"
    }
})

export default Settings;