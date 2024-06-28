import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";

function BottomSheet({bottomSheetModalRef, subject, setSelectedFeed, closeBottomSheet}) {
    function handleLinkClicked(item) {
        setSelectedFeed(item.value)
        closeBottomSheet()
    }

    return (
        <View style={{flex: 1, backgroundColor: '#1C1C1E'}}>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={['30%']}
                backgroundStyle={styles.bottomSheetModal}
                handleIndicatorStyle={styles.indicatorStyle}
            >
                <BottomSheetView style={styles.wrapper}>
                    <Text style={styles.title}>Andere Themen:</Text>
                    {subject.map((item, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => handleLinkClicked(item)}>
                            <View style={styles.container}>
                                <Text style={styles.text}>{item.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomSheetModal: {
        backgroundColor: '#1C1C1E'
    },
    indicatorStyle: {
        backgroundColor: 'white'
    },

    wrapper: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 22,
        color: "white",
        textAlign: "center",
    },
    container: {
        marginTop: 10,
    },
    text: {
        fontSize: 17,
        color: "white",
    },
});

export default BottomSheet;