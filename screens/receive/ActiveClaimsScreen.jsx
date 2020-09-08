import * as React from "react";
import { Button, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import PostDetailScreen from "../PostDetailScreen";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function ActiveClaimsScreen({ navigation, route }) {
    const { activeClaims, getAvailableOffersStatus, getAvailableOffersError } = useSelector(
        (state) => state.foodReception
    );

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
                <Text>Your active claims:</Text>
            </SBRow>
            <View style={{ height: screenHeight * .5 }}>
                <ScrollView>
                    {(getAvailableOffersError) ?
                        <Text style={{ color: 'red' }}>{getAvailableOffersError}</Text>
                        : (getAvailableOffersStatus === 'loading') ?
                            <Text>Loading claims...</Text>
                            : (activeClaims.length > 0) ?
                                <>
                                    {formatPosts(activeClaims)}
                                </>
                                :
                                <Text>No active claims!</Text>
                    }
                </ScrollView>
            </View>
            <Button title="Available Offers" onPress={() => navigation.navigate("Available Offers")} />
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