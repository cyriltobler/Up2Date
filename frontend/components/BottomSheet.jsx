import {StyleSheet, Text, View} from "react-native";
import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";

function BottomSheet({bottomSheetModalRef, subject}) {
    return(
        <View style={{ flex: 1, backgroundColor: '#1C1C1E' }}>
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={['90%']}
            //enablePanDownToClose={true}
            backgroundStyle={styles.bottomSheetModal}
            handleIndicatorStyle={styles.indicatorStyle}
        >
            <BottomSheetView style={styles.wrapper}>
                {subject.map((item, index) => (
                    <View key={index} style={styles.container}>
                        <Text style={styles.text}>{item}</Text>
                    </View>
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
        padding: 20
    },
    container: {
        marginVertical: 5,
    },
    text: {
        fontSize: 17,
        color: "white",
    },
});

export default BottomSheet;