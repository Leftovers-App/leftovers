import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

// Initialize Firebase
if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FireBaseConfig); }

const db = firebase.firestore();
const postsRef = db.collection('posts');

async function createFoodDonation(email, newPostDesc) {
    return postsRef.add({
        description: newPostDesc,
        foodDonor: email
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    });
};

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

export { createFoodDonation, deleteFoodDonation, getFoodDonations };

export default firebase