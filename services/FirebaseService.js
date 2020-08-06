import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

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
        status: 'available'
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
    await postsRef.doc(postId).set({ foodRecipient: email, status: 'claimed' }, { merge: true })
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
    await postsRef.doc(postId).set({ foodRecipient: '', status: 'available' }, { merge: true })
        .then(() => {
            console.log(`Recipient successfully removed for post with ID ${postId}!`)
        });
}

export {
    createFoodDonation, deleteFoodDonation, getFoodDonations,
    getAvailableOffers, getReceivedFood, setRecipient, removeRecipient
};

export default firebase