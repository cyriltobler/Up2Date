import AppleAuth from "../components/auth/AppleAuth";
import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import startImg from "../assets/startscreen.png"

function Auth() {
    return (
        <ImageBackground style={styles.screen} source={startImg}>
            <SafeAreaView style={styles.titleContainer}>
                <Text style={styles.title}>Welcome Back👋</Text>
                <Text style={styles.description}>Melde dich an und geniesse die neusten Nachrichten.</Text>
            </SafeAreaView>
            <SafeAreaView>
                <View style={styles.authContainer}>
                    <AppleAuth/>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1C1C1E',
    },
    titleContainer: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 35,
        fontWeight: "700",
        color: "white",

        marginTop: 30,
        marginBottom: 10,
    },
    description: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        width: "80%",
    },
    authContainer: {
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 10,
    }
});

export default Auth;