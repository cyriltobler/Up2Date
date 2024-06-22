import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { View, StyleSheet } from 'react-native';
import Context from "../Context";
import {useContext} from "react";
import {router} from "expo-router";
import config from "../../constants/config"

function AppleAuth() {
    const { setUserPreferences } = useContext(Context);

    return (
        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={5}
            style={styles.button}
            onPress={async () => {
                try {
                    const { identityToken } = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                    });

                    const response = await fetch(`${config.api.host}/auth/apple/callback`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            token: identityToken,
                        }),
                    });

                    if(!response.ok) return;

                    const data = await response.json();
                    const language = data.user.language;

                    if(!language) return router.replace('language')
                    setUserPreferences({
                        language
                    })

                    router.replace('(app)')
                } catch (e) {
                    if (e.code === 'ERR_REQUEST_CANCELED') {
                        console.log('canceled')
                    } else {
                        console.log(e)
                    }
                }
            }}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 44,
    },
});

export default AppleAuth;
