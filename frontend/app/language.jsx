import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    Pressable,
    Button,
    Alert
} from "react-native";
import languages from '../constants/iso_639.json';
import CountryFlag from "react-native-country-flag";
import {useContext, useState} from "react";
import Icon from 'react-native-vector-icons/Feather';
import {router} from "expo-router";
import Context from '../components/Context';

function LanguageItem({item, setLanguage, language}){
    function selectLanguage(){
        setLanguage((prevLanguage) => {
            if (prevLanguage.includes(item["639-2"])) {
                return prevLanguage.filter((language) => language !== item["639-2"]);
            } else {
                return [...prevLanguage, item["639-2"]];
            }
        });
    }

    return(
        <TouchableWithoutFeedback onPress={selectLanguage}>
            <View style={[
                itemStyle.container,
                language.includes(item["639-2"]) && itemStyle.containerSelected]}>
                <View style={itemStyle.languageBox}>
                    <CountryFlag isoCode={item["3166"]} size={20} style={itemStyle.flag}/>
                    <Text style={itemStyle.text}>{item.name}</Text>
                </View>
                {language.includes(item["639-2"]) && (
                    <Icon name="check" size={25} color="#30D158" />
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

function Language(){
    const { userPreferences, setUserPreferences } = useContext(Context);
    const [language, setLanguage] = useState(userPreferences?.language || []);

    async function submitLanguage(){
        const response = await fetch('http://10.80.4.184:3000/api/profile/language', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({language}),
        });

        if(!response.ok){
            Alert.alert('Sprache konnte nicht gespeichert werden.')
        }

        setUserPreferences(prevUserPreferences => ({
            ...prevUserPreferences,
            language
        }));

        if(router.canGoBack()){
            return router.back();
        }
        router.replace('(app)');
    }

    return(
        <View style={styles.screen}>
            <SafeAreaView style={titleStyle.container}>
                <Text style={titleStyle.text}>Sprachen</Text>
            </SafeAreaView>
            <Text style={styles.description}>Wählen Sie die Sprachen, in denen die Artikel angezeigt werden sollen.</Text>
            <FlatList
                style={styles.flatList}
                data={languages}
                renderItem={(({ item }) => <LanguageItem item={item} setLanguage={setLanguage} language={language} />)}
            ></FlatList>
            <SafeAreaView>
                <Pressable
                    onPress={submitLanguage}
                    style={[styles.btn, (language.length < 1) && styles.btnDisabled]}
                    disabled={(language.length < 1)}
                >
                    <Text style={styles.btnText}>Fortfahren</Text>
                </Pressable>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#141414',
        flex: 1,
    },
    description: {
        color: "white",
        marginHorizontal: 40,
        marginVertical: 10,
        textAlign: "center",
        fontSize: 18,
    },
    btn: {
        backgroundColor: "#fff",
        position: "absolute",
        alignSelf: "center",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,

        bottom: 30,

    },
    btnDisabled: {
        backgroundColor: "rgba(255,255,255,0.52)",
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
    }
});
const titleStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    }
});
const itemStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginHorizontal: 30,
        marginVertical: 2,
        padding: 10,
    },
    containerSelected: {
        borderRadius: 10,
        backgroundColor: "#1C1C1E",
    },
    languageBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    flag: {
        borderRadius: 20,
        aspectRatio: 1,
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 0.5,
    }
});

export default Language;