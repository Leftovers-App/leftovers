import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

const db = firebase.firestore();
const postsRef = db.collection('posts');

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

async function getAvailableOffers() {
    const postsQuery = postsRef.where('status', '==', 'available');
    return postsQuery.get()
        .then(posts => {
            console.log('Retrieved available offers!');
            return posts;
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

async function deleteFoodDonation(postId) {
    await postsRef.doc(postId).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        });
}

async function setRecipient(postId, email) {
    await postsRef.doc(postId).set({ foodRecipient: email, status: 'claimed' }, { merge: true })
        .then(() => {
            console.log(`Recipient ${email} successfully set for post with ID ${postId}!`)
        });
}

export { createFoodDonation, deleteFoodDonation, getAvailableOffers, getFoodDonations, setRecipient };

export default firebase