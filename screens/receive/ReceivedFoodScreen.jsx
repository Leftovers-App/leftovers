import React, { useState, useEffect } from "react";
import { Alert, Button, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { cancelClaim, confirmDelivery } from "../../slices/foodReceptionReducer";
import { useDispatch, useSelector } from "react-redux";
import { CheckSquareIcon, CircleXIcon } from "../../components/Icons";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function ReceivedFoodScreen({ navigation, route }) {
    const { getReceivedFoodError, getReceivedFoodStatus, receivedFood } = useSelector(
        (state) => state.foodReception
    );
    const dispatch = useDispatch();

    const formatPosts = (posts) => {
        let formattedPosts = [];
        posts.forEach(doc => {
            formattedPosts.push(
                <TouchableOpacity key={doc.id} onPress={() => navigation.navigate("Post Detail", { postId: doc.id, role: "receive" })}>
                    <SBRow style={{ marginBottom: 25 }}>
                        <Text>{doc.data.description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ marginRight: 25 }}>{doc.data.status}</Text>
                        </View>
                    </SBRow>
                </TouchableOpacity>
            )
        })
        return formattedPosts;
    }

    return (
        <Container>
            <SBRow>
                <Text>Received Food:</Text>
            </SBRow>
            <View style={{ height: screenHeight * .5 }}>
                <ScrollView>
                    {(getReceivedFoodError) ?
                        <Text style={{ color: 'red' }}>{getReceivedFoodError}</Text>
                        : (getReceivedFoodStatus === 'loading') ?
                            <Text>Loading received food...</Text>
                            : (receivedFood.length > 0) ?
                                <>
                                    {formatPosts(receivedFood)}
                                </>
                                :
                                <Text>No received food available!</Text>
                    }
                </ScrollView>
            </View>
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;

const SBRow = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    width: ${screenWidth * .8}px;
`;