import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

// Initialize Firebase
if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FireBaseConfig); }

function getFoodDonations(email) {
    const db = firebase.firestore();
    const postsRef = db.collection('posts');
    const postsQuery = postsRef.where('foodDonor', '==', email);
    postsQuery.get()
        .then(posts => {
            console.log('getting data in firebase service');
            return posts;
        });
}

export { getFoodDonations };

export default firebase