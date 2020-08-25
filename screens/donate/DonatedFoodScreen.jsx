import React, { useState, useEffect } from "react";
import { Alert, Button, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { cancelFoodDonation, confirmPickup } from "../../slices/foodDonationReducer";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon, CircleXIcon } from "../../components/Icons";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function DonatedFoodScreen({ navigation, route }) {
    const { confirmPickupStatuses, confirmPickupErrors, deleteFoodDonationStatuses, deleteFoodDonationErrors, foodDonations, getFoodDonationsStatus, getFoodDonationsError } = useSelector(
        (state) => state.foodDonation
    );
    const dispatch = useDispatch();

    const formatPosts = (posts) => {
        let formattedPosts = [];
        posts.forEach(doc => {
            formattedPosts.push(
                <TouchableOpacity key={doc.id} onPress={() => navigation.navigate("Post Detail")}>
                    <SBRow style={{ marginBottom: 25 }}>
                        <Text>{doc.data.description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ marginRight: 25 }}>{doc.data.status}</Text>
                            {(doc.data.status === 'available') ?
                                <>
                                    {
                                        (deleteFoodDonationErrors[doc.id]) ?
                                            <Text style={{ color: 'red' }}>Failed</Text>
                                            : (deleteFoodDonationStatuses[doc.id] === 'loading') ?
                                                <Text>Loading</Text>
                                                :
                                                <TouchableOpacity onPress={() => { dispatch(cancelFoodDonation(doc.id)); }}><CircleXIcon /></TouchableOpacity>
                                    }
                                </>
                                : (doc.data.status === "assigned") ?
                                    <>
                                        {
                                            (confirmPickupErrors[doc.id]) ?
                                                <Text style={{ color: 'red' }}>Failed</Text>
                                                : (confirmPickupStatuses[doc.id] === 'loading') ?
                                                    <Text>Loading</Text>
                                                    :
                                                    <TouchableOpacity onPress={() => { dispatch(confirmPickup(doc.id)); }}><CheckIcon /></TouchableOpacity>
                                        }
                                    </>
                                    : <></>
                            }
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
                <Text>Your food donations:</Text>
            </SBRow>
            <View style={{ height: screenHeight * .5 }}>
                <ScrollView>
                    {(getFoodDonationsError) ?
                        <Text style={{ color: 'red' }}>{getFoodDonationsError}</Text>
                        : (getFoodDonationsStatus === 'loading') ?
                            <Text>Loading donations...</Text>
                            : (foodDonations.length > 0) ?
                                <>
                                    {formatPosts(foodDonations)}
                                </>
                                :
                                <Text>No existing donations!</Text>
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