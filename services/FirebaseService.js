import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
console.log('Firebase initialized!');

const db = firebase.firestore();
const postsRef = db.collection('posts');

// -----------
// Donation
// -----------

// DonatedFoodScreen

async function deleteFoodDonation(postId) {
    await postsRef.doc(postId).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        });
}

async function getFoodDonations(email) {
    const postsQuery = postsRef.where('foodDonor', '==', email);
    return postsQuery.get()
        .then(posts => {
            console.log('Retrieved food donations!');
            return posts;
        });
}

// NewOfferScreen

async function createFoodDonation(email, newPostDesc) {
    return postsRef.add({
        description: newPostDesc,
        foodDonor: email,
        status: 'available',
        created: new Date()
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    });
};

// -----------
// Reception
// -----------

// AvailableOffersScreen

async function getAvailableOffers() {
    const postsQuery = postsRef.where('status', '==', 'available');
    return postsQuery.get()
        .then(posts => {
            console.log('Retrieved available offers!');
            return posts;
        });
}

async function setRecipient(postId, email) {
    await postsRef.doc(postId).update({
        foodRecipient: email,
        status: 'claimed',
        claimed: new Date()
    })
        .then(() => {
            console.log(`Recipient ${email} successfully set for post with ID ${postId}!`)
        });
}

// ReceivedFoodScreen

async function getReceivedFood(email) {
    const postsQuery = postsRef.where('foodRecipient', '==', email);
    return postsQuery.get()
        .then(posts => {
            console.log('Retrieved received food!');
            return posts;
        });
}

async function removeRecipient(postId) {
    await postsRef.doc(postId).update({
        foodRecipient: null,
        status: 'available',
        claimed: null
    })
        .then(() => {
            console.log(`Recipient successfully removed for post with ID ${postId}!`)
        });
}

// -----------
// Delivery
// -----------

// FoodDeliveredScreen

async function getDeliveries(email) {
    const postsQuery = postsRef.where('transporter', '==', email);
    return postsQuery.get()
        .then(posts => {
            console.log('Retrieved received food!');
            return posts;
        });
}


// JobAssignmentScreen

async function acceptJob(postId, email) {
    await postsRef.doc(postId).update({
        transporter: email,
        status: 'assigned',
        assigned: new Date(),
        pendingAssignmentSince: null
    })
        .then(() => {
            console.log(`Transporter ${email} accepted job with ID ${postId}!`);
        });
}

async function declineJob(postId) {
    await postsRef.doc(postId).update({
        status: 'claimed',
        pendingAssignmentSince: null
    })
        .then(() => {
            console.log(`Transporter declined job with ID ${postId}!`);
        });
}

async function setJobPending(postId) {
    await postsRef.doc(postId).update({
        status: 'pending assignment',
        pendingAssignmentSince: new Date()
    })
        .then(() => {
            console.log(`Set status pending for post with ID ${postId}!`)
        });
}

async function removeTransporter(postId) {
    await postsRef.doc(postId).update({
        transporter: null,
        status: 'claimed',
        assigned: null
    })
        .then(() => {
            console.log(`Delivery canceled for post with ID ${postId}!`)
        });
}

export {
    postsRef,
    createFoodDonation, deleteFoodDonation, getFoodDonations,
    getAvailableOffers, getReceivedFood, setRecipient, removeRecipient,
    acceptJob, declineJob, getDeliveries, setJobPending, removeTransporter
};

export default firebase