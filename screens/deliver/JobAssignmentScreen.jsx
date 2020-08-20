import React, { useEffect } from "react";
import { Alert, Button, Dimensions, Platform, Text, View } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { cancelJob, cancelJobAcceptError, fetchAvailableJobs, performJobAction, setPendingJob } from "../../slices/foodDeliveryReducer";
import { declineJob } from "../../services/FirebaseService";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function JobAssignmentScreen({ navigation, route }) {
    const {
        cancelJobError, cancelJobStatus, currentJob, getAvailableJobsError, getAvailableJobsStatus, availableJobs,
        pendingJob, seenJobs, setJobPendingError, setJobPendingStatus
    } = useSelector(
        (state) => state.foodDelivery
    );
    const dispatch = useDispatch();

    useEffect(() => { if (!currentJob) { dispatch(fetchAvailableJobs(currentJob)); } }, [])
    useEffect(() => { if (cancelJobError) { Alert.alert(cancelJobError); } }, [cancelJobError])

    return (
        <Container>
            {(currentJob) ?
                <>
                    <Text>Donor: {currentJob.data.foodDonor}</Text>
                    <Text>Recipient: {currentJob.data.foodRecipient}</Text>
                    <Text>Description: {currentJob.data.description}</Text>
                    {(cancelJobStatus === "loading") ?
                        <Text>Canceling job...</Text>
                        :
                        <Button title="Cancel Job" onPress={() => dispatch(cancelJob(currentJob.id, seenJobs, currentJob, pendingJob))} />
                    }
                </>
                : (getAvailableJobsError) ?
                    <Text style={{ color: 'red' }}>{getAvailableJobsError}</Text>
                    : (getAvailableJobsStatus === 'loading') ?
                        <Text>Loading available jobs...</Text>
                        : (setJobPendingError) ?
                            <Text style={{ color: 'red' }}>{setJobPendingError}</Text>
                            : (setJobPendingStatus === 'loading') ?
                                <Text>Setting pending job...</Text>
                                : (pendingJob) ?
                                    <>
                                        <Text>Would you like to accept this job?</Text>
                                        <Text>Donor: {pendingJob.data.foodDonor}</Text>
                                        <Text>Recipient: {pendingJob.data.foodRecipient}</Text>
                                        <Text>Description: {pendingJob.data.description}</Text>
                                        <View style={{ width: screenWidth * .8, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                            <Button title="Accept" onPress={() => dispatch(performJobAction(true))} />
                                            <Button title="Decline" onPress={() => dispatch(performJobAction(false))} />
                                        </View>
                                    </>
                                    :
                                    <>
                                        <Text>No jobs available!</Text>
                                        <Text>The page will refresh when a job becomes available.</Text>
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