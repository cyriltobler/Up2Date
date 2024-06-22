import {SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions, ScrollView, Button} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SegmentControl from '../../components/SegmentControl'
import FeedUI from "../../components/FeedUI";
import {Link} from "expo-router";
import {useCallback, useRef, useState} from "react"
import { BottomSheetModal, BottomSheetModalProvider  } from '@gorhom/bottom-sheet';
import BottomSheet from "../../components/BottomSheet"
import subject from '../../constants/feeds.json'

const notDisplayedSubjects = subject.slice(4)
const displayedSubjects = subject.slice(0, 4)

const windowWidth = Dimensions.get('window').width;

function Index(){
    const bottomSheetModalRef = useRef(null);
    const [selectedFeed, setSelectedFeed] = useState("/");

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };

    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.dismiss();
    };

    return(
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
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
                        <Link href="settings">
                            <View style={styles.profile}></View>
                        </Link>
                    </SafeAreaView>
                    <SegmentControl openBottomSheet={openBottomSheet} subject={displayedSubjects} setSelectedFeed={setSelectedFeed}></SegmentControl>
                    <FeedUI selectedFeed={selectedFeed}></FeedUI>
                    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} subject={notDisplayedSubjects} setSelectedFeed={setSelectedFeed} closeBottomSheet={closeBottomSheet}></BottomSheet>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
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