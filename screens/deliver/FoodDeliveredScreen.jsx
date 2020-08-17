import React, { useState, useEffect } from "react";
import { Alert, Button, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { fetchDeliveries } from "../../slices/foodDeliveryReducer";
import { useDispatch, useSelector } from "react-redux";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function FoodDeliveredScreen({ navigation, route }) {
    const { email } = useSelector(
        (state) => state.auth
    );
    const { deliveries, getFoodDeliveriesStatus, getFoodDeliveriesError } = useSelector(
        (state) => state.foodDelivery
    );
    const dispatch = useDispatch();

    const formatPosts = (posts) => {
        let formattedPosts = [];
        posts.forEach(doc => {
            formattedPosts.push(
                <SBRow key={doc.id} style={{ marginBottom: 25 }}>
                    <Text>{doc.data.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ marginRight: 25 }}>{doc.data.status}</Text>
                    </View>
                </SBRow>
            )
        })
        return formattedPosts;
    }

    useEffect(() => {
        if (email) {
            dispatch(fetchDeliveries(email));
        }
    }, []);

    return (
        <Container>
            <SBRow>
                <Text>Your food deliveries:</Text>
                <Button title="Reload" onPress={() => { dispatch(fetchDeliveries(email)); }} />
            </SBRow>
            <View style={{ height: screenHeight * .5 }}>
                <ScrollView>
                    {(getFoodDeliveriesError) ?
                        <Text style={{ color: 'red' }}>{getFoodDeliveriesError}</Text>
                        : (getFoodDeliveriesStatus === 'loading') ?
                            <Text>Loading donations...</Text>
                            : (deliveries.length > 0) ?
                                <>
                                    {formatPosts(deliveries)}
                                </>
                                :
                                <Text>No existing deliveries!</Text>
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