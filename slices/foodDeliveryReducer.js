import { createSlice } from "@reduxjs/toolkit";
import { acceptJob, declineJob, postsRef, setJobPending, removeTransporter } from "../services/FirebaseService";
import { convertTimestamps } from "../services/TimestampUtil";

let initialState = {
    cancelJobError: null,
    cancelJobStatus: "idle",
    currentJob: null,
    deliveries: [],
    getDeliveriesError: null,
    getDeliveriesStatus: "idle",
    getAvailableJobsError: null,
    getAvailableJobsStatus: "idle",
    jobActionError: null,
    jobActionStatus: "idle",
    availableJobs: [],
    pendingJob: null,
    seenJobs: {},
    setJobPendingError: null,
    setJobPendingStatus: "idle"
};

const foodDeliverySlice = createSlice({
    name: "foodDelivery",
    initialState,
    reducers: {
        cancelJobStarted(state, action) {
            state.cancelJobError = null;
            state.cancelJobStatus = 'loading';
        },
        cancelJobSuccess(state, action) {
            state.cancelJobStatus = 'idle';
            state.currentJob = null;
        },
        cancelJobFailed(state, action) {
            state.cancelJobError = action.payload;
            state.cancelJobStatus = 'idle';
        },
        cancelJobAcceptError(state, action) {
            state.cancelJobError = null;
        },
        jobActionStarted(state, action) {
            state.jobActionError = null;
            state.jobActionStatus = 'loading';
        },
        jobActionSuccess(state, action) {
            state.pendingJob = null;
            state.jobActionStatus = 'idle';
        },
        jobActionFailed(state, action) {
            state.jobActionError = action.payload;
            state.jobActionStatus = 'idle';
        },
        getDeliveriesStarted(state) {
            state.getDeliveriesError = null;
            state.getDeliveriesStatus = 'loading';
        },
        getDeliveriesSuccess(state, action) {
            state.deliveries = action.payload;
            state.getDeliveriesStatus = 'idle';
        },
        getDeliveriesFailed(state, action) {
            state.getDeliveriesError = action.payload;
            state.getDeliveriesStatus = 'idle';
        },
        getAvailableJobsStarted(state) {
            state.getAvailableJobsError = null;
            state.getAvailableJobsStatus = 'loading';
        },
        getAvailableJobsSuccess(state, action) {
            state.availableJobs = action.payload;
            state.getAvailableJobsStatus = 'idle';
        },
        getAvailableJobsFailed(state, action) {
            state.getAvailableJobsError = action.payload;
            state.getAvailableJobsStatus = 'idle';
        },
        setCurrentJob(state, action) {
            state.currentJob = action.payload;
        },
        setJobPendingStarted(state, action) {
            state.setJobPendingStatus = 'loading';
            state.setJobPendingError = null;
            state.pendingJob = action.payload;
            let seenJobs = state.seenJobs;
            seenJobs[action.payload.id] = action.payload;
            state.seenJobs = seenJobs;
        },
        setJobPendingSuccess(state, action) {
            state.setJobPendingStatus = 'idle';
        },
        setJobPendingFailed(state, action) {
            state.pendingJob = null;
            state.setJobPendingError = action.payload;
            state.setJobPendingStatus = 'idle';
        },
    },
});

const cancelJob = (postId) => async dispatch => {
    dispatch(cancelJobStarted(postId));
    try {
        await removeTransporter(postId);
        dispatch(cancelJobSuccess());
        dispatch(fetchAvailableJobs());
    }
    catch (err) {
        console.error(err);
        dispatch(cancelJobFailed({ id: postId, error: err.toString() }));
    }
}

const fetchDeliveries = () => async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(getDeliveriesStarted());
    try {
        postsRef.where("transporter", "==", email)
            .onSnapshot((posts) => {
                let deliveries = [];
                let currentJob = null;
                posts.forEach(doc => {
                    let postData = convertTimestamps(doc.data());
                    let delivery = {
                        id: doc.id,
                        data: postData
                    };
                    deliveries.push(delivery);

                    const status = delivery.data.status;
                    if (status === "assigned" || status === "picked up") {
                        currentJob = delivery;
                    }
                });
                dispatch(setCurrentJob(currentJob));
                dispatch(getDeliveriesSuccess(deliveries));
            });
    } catch (err) {
        console.error(err.toString());
        dispatch(getDeliveriesFailed(err.toString()));
    }
}

const fetchAvailableJobs = () => async (dispatch, getState) => {
    const { currentJob } = getState().foodDelivery;
    dispatch(getAvailableJobsStarted());
    try {
        postsRef.where('status', '==', 'claimed').orderBy('claimed', 'desc')
            .onSnapshot((posts) => {
                // If current job, end subscription
                if (currentJob) {
                    return
                }
                let availableJobs = [];
                posts.forEach(doc => {
                    let postData = convertTimestamps(doc.data());
                    availableJobs.push({
                        id: doc.id,
                        data: postData
                    });
                });
                dispatch(getAvailableJobsSuccess(availableJobs));
                dispatch(setPendingJob());
            });
    } catch (err) {
        console.error(err.toString());
        dispatch(getAvailableJobsFailed(err.toString()));
    }
}

const performJobAction = (accepted) => async (dispatch, getState) => {
    const { email } = getState().auth;
    const { pendingJob } = getState().foodDelivery;

    dispatch(jobActionStarted());
    const postId = pendingJob.id;
    try {
        if (accepted) {
            await acceptJob(postId, email);
            dispatch(jobActionSuccess());
        }
        else {
            await declineJob(postId);
            dispatch(jobActionSuccess());
        }
    }
    catch (err) {
        console.error(err);
        dispatch(jobActionFailed(err.toString()));
    }
}

const setPendingJob = () => async (dispatch, getState) => {
    const { currentJob, pendingJob, availableJobs, seenJobs } = getState().foodDelivery
    if (currentJob) { return }
    else if (pendingJob) { return }
    else {
        try {
            let jobToSet = null;
            for (let i = 0; i < availableJobs.length; i++) {
                if (!(availableJobs[i].id in seenJobs)) {
                    jobToSet = availableJobs[i];
                    dispatch(setJobPendingStarted(jobToSet));
                    await setJobPending(jobToSet.id);
                    console.log('Set job pending!');
                    dispatch(setJobPendingSuccess());
                    break;
                }
            }
        }
        catch (err) {
            console.error(err);
            dispatch(setJobPendingFailed(err.toString()));
        }
    }
}

const { actions, reducer } = foodDeliverySlice;
export const {
    cancelJobStarted, cancelJobSuccess, cancelJobFailed, cancelJobAcceptError,
    jobActionStarted, jobActionSuccess, jobActionFailed,
    getDeliveriesStarted, getDeliveriesSuccess, getDeliveriesFailed,
    getAvailableJobsStarted, getAvailableJobsSuccess, getAvailableJobsFailed,
    setJobPendingStarted, setJobPendingSuccess, setJobPendingFailed,
    setCurrentJob
} = actions;
export { cancelJob, fetchDeliveries, fetchAvailableJobs, performJobAction, setPendingJob };
export default reducer;