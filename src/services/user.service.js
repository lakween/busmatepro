import firebase from "firebase/compat/app";
import {getFirestore} from "firebase/firestore";
import {useSelector} from "react-redux";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

export const googleSignUp = async () => {

    let provider = new firebase.auth.GoogleAuthProvider();
    let result = await firebase.auth().signInWithPopup(provider).then(function (result) {
        return {email: result.user.email, user_name: result.user.displayName}
    }).catch(function (error) {
        return {success: false}
    });
    return result
}

export const createNewUser = (form) => {
    const db = firebase.firestore();
    db.collection("userProfile").add(form)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}
