import React, { useEffect, useState } from "react";
import { Alert, Button, Dimensions, Platform, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { addFoodDonation, createFoodDonationReset, fetchFoodDonations } from "../../slices/foodDonationReducer";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function DonatedFoodScreen({ navigation, route }) {
    const { createFoodDonationError, createFoodDonationStatus, newFoodDonationId } = useSelector(
        (state) => state.foodDonation
    );
    const [newPostDesc, setNewPostDesc] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (newFoodDonationId) {
            console.log('New donation confirmed in NewOfferScreen: ', newFoodDonationId);
            setNewPostDesc("");
            navigation.navigate("Active Donations");
            dispatch(createFoodDonationReset());
        }
    }, [newFoodDonationId]);

    useEffect(() => {
        if (createFoodDonationError) {
            Alert.alert(createFoodDonationError);
        }
    }, [createFoodDonationError]);

    return (
        <Container>
            {(createFoodDonationStatus === 'loading') ?
                <Text>Creating food offer...</Text>
                :
                <>
                    <Text>Offer some food!</Text>
                    <TextInput placeholder="Post Description" style={{ width: screenWidth * .8, height: 40, borderWidth: 1 }} value={newPostDesc} onChangeText={(text) => { setNewPostDesc(text) }} />
                    <Button title="Create Post" onPress={() => dispatch(addFoodDonation(newPostDesc))} />
                    <Button title="Active Donations" onPress={() => navigation.navigate("Active Donations")} />
                </>
            }
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;