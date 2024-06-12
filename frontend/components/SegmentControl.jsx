import { StyleSheet, Text, Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const windowWidth = Dimensions.get('window').width;

const subjects = ["Für dich", "abonniert", "Technik", "News", "..."];


function SegmentControl(){
    const [selectedSegment, setSelectedSegment] = useState(0);

    function handleSegmentPress(index){
        setSelectedSegment(index)
    }

    return(
        <View style={styles.wrapper}>
            {subjects.map((item, index) => (
                <TouchableOpacity key={index} style={[
                    styles.chip,
                    selectedSegment === index && styles.activeChip
                ]} onPress={() => handleSegmentPress(index)}>
                    <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        height: 30,
        marginVertical: 7,
        marginHorizontal: 15,

        width: windowWidth - 30.24,
        overflow: 'hidden'
    },
    chip: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15.12,
        paddingRight: 15.12,
        paddingLeft: 15.12,
    },
    activeChip: {
        backgroundColor: "#2B2B2E",
    },
    text: {
        color: "white",
        fontsize: 16,
    }
});
export default SegmentControl;