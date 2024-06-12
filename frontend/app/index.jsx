import {SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions, ScrollView} from 'react-native';
import SegmentControl from '../components/SegmentControl'
import FeedUI from "../components/FeedUI";
import {Link} from "expo-router";

const windowWidth = Dimensions.get('window').width;

function Index(props){
    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TextInput
                    style={styles.input}
                    //onChangeText={onChangeText}
                    //value={text}
                    placeholder="Search..."
                    placeholderTextColor="#9E9EA5"
                    returnKeyType="go"
                />
                <Link href="/settings">
                    <View style={styles.profile}></View>
                </Link>
            </SafeAreaView>
            <SegmentControl></SegmentControl>
            <FeedUI></FeedUI>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141414',
        flex: 1,
    },
    header: {
        flexDirection: "row",
        gap: 15,
        marginHorizontal: 15,
    },
    input: {
        height: 50,
        width: windowWidth - 95,
        borderRadius: 25,
        backgroundColor: "#2B2B2E",

        paddingLeft: 25,
        fontSize: 22,
    },
    profile: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "#7E7EFF",
    }
});

export default Index;