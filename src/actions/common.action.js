import firebase from "firebase/compat/app";
import {collection, getDocs} from "firebase/firestore";

export const getDocFromCollection = (collection,document)=>{
    return async (dispatch)=>{
        let data = ''
        const db = firebase.firestore();
        const snapshot = await db.collection(collection).doc(document).get()
        return snapshot.data() ? snapshot.data() : {}
    }
}