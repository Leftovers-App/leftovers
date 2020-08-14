import { createSlice } from "@reduxjs/toolkit";
import { acceptJob, declineJob, getDeliveries, postsRef, setJobPending, removeTransporter } from "../services/FirebaseService";

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
            state.currentJob = action.payload;
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

const cancelJob = (postId, seenJobs, currentJob, pendingJob) => async dispatch => {
    dispatch(cancelJobStarted(postId));
    try {
        await removeTransporter(postId);
        dispatch(cancelJobSuccess());
        dispatch(fetchAvailableJobs(seenJobs, currentJob, pendingJob));
    }
    catch (err) {
        console.error(err);
        dispatch(cancelJobFailed({ id: postId, error: err.toString() }));
    }
}

const fetchDeliveries = (email) => async dispatch => {
    dispatch(getDeliveriesStarted());
    try {
        const posts = await getDeliveries(email);
        let deliveries = [];
        posts.forEach(doc => {
            let postData = doc.data();
            delete postData['claimed'];
            delete postData['pendingAssignmentSince'];
            delete postData['created'];
            deliveries.push({
                id: doc.id,
                data: postData
            });
        })
        dispatch(getDeliveriesSuccess(deliveries));
    } catch (err) {
        dispatch(getDeliveriesFailed(err.toString()));
    }
}

const fetchAvailableJobs = () => async (dispatch, getState) => {
    const { currentJob } = getState().foodDelivery;
    dispatch(getAvailableJobsStarted());
    try {
        // console.log('Starting getAvailableJobs()...');
        postsRef.where('status', '==', 'claimed').orderBy('claimed', 'desc').limit(10)
            .onSnapshot((posts) => {
                // If current job, end subscription
                if (currentJob) {
                    return
                }
                // console.log('snapshot retrieved!!!');
                let availableJobs = [];
                posts.forEach(doc => {
                    let postData = doc.data();
                    delete postData['claimed'];
                    delete postData['pendingAssignmentSince'];
                    delete postData['created'];
                    availableJobs.push({
                        id: doc.id,
                        data: postData
                    });
                });
                console.log(`length of available jobs snapshot: ${availableJobs.length}`);
                // console.log('available jobs:');
                // console.log(availableJobs);
                dispatch(getAvailableJobsSuccess(availableJobs));
                dispatch(setPendingJob());
            });
    } catch (err) {
        console.error(err.toString());
        dispatch(getAvailableJobsFailed(err.toString()));
    }
}

const performJobAction = (pendingJob, email, accepted) => async dispatch => {
    dispatch(jobActionStarted());
    const postId = pendingJob.id;
    try {
        if (accepted) {
            await acceptJob(postId, email);
            dispatch(jobActionSuccess(pendingJob));
        }
        else {
            await declineJob(postId);
            dispatch(jobActionSuccess(null));
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
    setJobPendingStarted, setJobPendingSuccess, setJobPendingFailed
} = actions;
export { cancelJob, fetchDeliveries, fetchAvailableJobs, performJobAction, setPendingJob };
export default reducer;