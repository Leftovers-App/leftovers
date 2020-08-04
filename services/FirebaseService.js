import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

// Initialize Firebase
if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FireBaseConfig); }

const db = firebase.firestore();
const postsRef = db.collection('posts');

async function getFoodDonations(email) {
    const postsQuery = postsRef.where('foodDonor', '==', email);
    return postsQuery.get()
        .then(posts => {
            return posts;
        });
}

async function deleteFoodDonation(postId) {
    await postsRef.doc(postId).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        });
}

export { deleteFoodDonation, getFoodDonations };

export default firebase