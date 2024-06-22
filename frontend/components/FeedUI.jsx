import {FlatList, View, Text, StyleSheet, TouchableWithoutFeedback, RefreshControl, Image, Dimensions, Linking } from "react-native";
import { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import calculateTimeAgo from "./calculateTimeAgo";
import {router} from "expo-router";
import config from "../constants/config";
import feeds from "../constants/feeds.json"

const windowWidth = Dimensions.get('window').width;

function Article({item, index}){
    async function openArticle(url){
        try{
            const result = await WebBrowser.openBrowserAsync(url, {
                readerMode: true, //TODO Settings
            });
            //TODO Linking.openURL(url);
        }catch(error){
            console.error(error);
        }
    }

    return(
        <View style={[
            styles.wrapper,
            index === 0 && styles.firstWrapper,
        ]}>
            <TouchableWithoutFeedback onPress={() => openArticle(item.link)}>
                <View style={styles.container}>
                    <View style={styles.leftBox}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableWithoutFeedback onPress={() => console.log('test')}>
                            <View style={styles.articleBottom}>
                                <Image style={styles.logo}
                                    source={{
                                        uri: item.channelImg,
                                    }}
                                ></Image>
                                <Text style={styles.informationText}>{item.domain}</Text>
                                <View style={styles.point}></View>
                                <Text style={styles.informationText}>vor {calculateTimeAgo(item.isoDate)}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Image style={styles.img}
                        source={{
                            uri: item.img
                        }}
                    ></Image>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.separator}></View>
        </View>
    )
}

function FeedUI({selectedFeed}){
    const { title, value } = feeds.find(feed => feed.value === selectedFeed)

    const [feedData, setFeedData] = useState({
        [value]: {
            title,
            data: [],
            scrollHeight: 0,
        }
    });
    console.log(feedData)

    function addData(newData){
        console.log(newData)
        setFeedData(prevState => ({
            ...prevState,
            [selectedFeed]: {
                ...prevState[selectedFeed],
                data: [...prevState[selectedFeed]?.data ?? [], ...newData],
            },
        }));
    }

    // const [data, setData] = useState([]);

    async function fetchData() {
        const response = await fetch(`${config.api.host}/api/articles/${selectedFeed}`);
        if(response.status === 401) return router.replace('auth');
        const jsonData = await response.json();

        //feedData[selectedFeed].setData(prevData => [...prevData, ...jsonData]);
        addData(jsonData)
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedFeed]);

    return(
        <FlatList
            data={feedData[selectedFeed]?.data ?? []}
            renderItem={({ item, index }) => <Article item={item} index={index} />}
            onEndReached={fetchData}
            onEndReachedThreshold={0.8}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => console.log('refresh')}
                />
            }
        ></FlatList>
    )
}

const styles = StyleSheet.create({
    firstWrapper: {
        marginTop: -7,
    },
    wrapper: {
        width: windowWidth - 2 * 15.12,
        marginHorizontal: 15.12,
    },
    container: {
        marginVertical: 10,
        flexDirection: "row",
    },
    "container:first-child": {
        marginTop: 3,
    },
    leftBox: {
        width: windowWidth - 3 * 15.12 - 92,
        marginRight: 15.12,
        justifyContent :"space-between",
        marginVertical: 4,
    },
    title: {
        color: "white",
        fontSize: 16,
    },
    articleBottom: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    logo: {
        aspectRatio: 2,
        resizeMode: "contain",
        height: 15,
    },
    informationText: {
        color: "#8C8C8C",
        fontSize: 11,
    },
    point: {
        height: 3,
        width: 3,
        backgroundColor: "#8C8C8C",
        borderRadius: 1.5,
        marginHorizontal: 2,
    },
    img: {
        width: 92,
        height: 92,
        borderRadius: 15,
    },
    separator: {
        height: 2,
        width: "100%",
        backgroundColor: "#333336"
    }
});

export default FeedUI;
