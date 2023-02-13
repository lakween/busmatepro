import { collection, query, where, onSnapshot } from "firebase/firestore";
import firebase from "firebase/compat/app";
import {useEffect} from "react";
const Notifications = () => {
    const db = firebase.firestore();
    const q = query(collection(db, "user requests"), where("status", "==", "waiting"));
    const unsubscribe = ''

    // useEffect(()=>{
    //     onSnapshot(q, { includeMetadataChanges: true },  (snapshot) => {
    //         snapshot.docChanges().forEach((change) => {
    //                 console.log("New city: ", change.doc.data());
    //         });
    //     });
    // })


    return (
        <>
        </>
    )
}

export default Notifications