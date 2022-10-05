import firebase from "firebase/compat/app";
import {collection, getDocs, addDoc, doc, where, query, getDoc, setDoc,updateDoc} from "firebase/firestore";

export const getDocFromCollection = async (coll, docum) => {

    const db = firebase.firestore();
    const docRef = await doc(db, coll, docum);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return {}
    }
}

export const createDocOfCollection = async (collName, data) => {
    const db = firebase.firestore();
    const docRef = await addDoc(collection(db, collName), data);
    return docRef.id
}

export const updateFieldsOnly = async (collName,docu,data)=>{
    const db = firebase.firestore();
    const ref = doc(db, collName, docu)
    await updateDoc(ref, {
      ...data
    });
}

export const updateDocument = async (col, docum, data) => {
    const db = firebase.firestore();
    delete data.id
    await setDoc(doc(db, col, docum), data);
}

export const getAllDocFromCollection = async (collName) => {
    const db = firebase.firestore();
    let array = []
    const querySnapshot = await getDocs(collection(db, collName));
    for (let doc of querySnapshot.docs) {
        array.push({...doc.data(), id: doc.id})
    }
    return array
}

export const filterDocsFromCollection = async (coll, fields, filters) => {
    const db = firebase.firestore();
    let filterArray = []
    for (let item of filters) {
        if (item[2] == '') {
            continue
        }
        filterArray.push(where(item[0], item[1], item[2]))
    }
    const collRef = await collection(db, coll);
    const queryData = await query(collRef, ...filterArray);
    let array = []
    const querySnapshot = await getDocs(queryData)
    for (let document of querySnapshot.docs) {
        array.push({...document.data(), id: document.id})
    }
    return array
}


