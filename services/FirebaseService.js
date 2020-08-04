import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

// Initialize Firebase
if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FireBaseConfig); }

async function getFoodDonations(email) {
    const db = firebase.firestore();
    const postsRef = db.collection('posts');
    const postsQuery = postsRef.where('foodDonor', '==', email);
    return postsQuery.get()
        .then(posts => {
            return posts;
        });
}

export { getFoodDonations };

export default firebase