import React, { useState, useEffect } from "react";
import { Alert, Button, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { fetchAvailableOffers } from "../../slices/foodReceptionReducer";
import { useDispatch, useSelector } from "react-redux";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function AvailableOffersScreen({ navigation, route }) {
    const { availableOffers, getAvailableOffersStatus, getAvailableOffersError } = useSelector(
        (state) => state.foodReception
    );
    const dispatch = useDispatch();

    const formatPosts = (posts) => {
        let formattedPosts = [];
        posts.forEach(doc => {
            formattedPosts.push(
                <SBRow key={doc.id} style={{ marginBottom: 25 }}>
                    <Text>{doc.data.description}</Text>
                </SBRow>
            )
        })
        return formattedPosts;
    }

    useEffect(() => {
        dispatch(fetchAvailableOffers());
    }, []);

    return (
        <Container>
            <SBRow>
                <Text>Available Offers:</Text>
                <Button title="Reload" onPress={() => { dispatch(fetchAvailableOffers()); }} />
            </SBRow>
            <View style={{ height: screenHeight * .5 }}>
                <ScrollView>
                    {(getAvailableOffersError) ?
                        <Text style={{ color: 'red' }}>{getAvailableOffersError}</Text>
                        : (getAvailableOffersStatus === 'loading') ?
                            <Text>Loading offers...</Text>
                            : (availableOffers.length > 0) ?
                                <>
                                    {formatPosts(availableOffers)}
                                </>
                                :
                                <Text>No offers available!</Text>
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