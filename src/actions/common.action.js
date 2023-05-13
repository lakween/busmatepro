import firebase from "firebase/compat/app";
import {getAuth, signOut, updateProfile} from "firebase/auth";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    where,
    query,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {setCommonState} from "../store/reducers/common-slice";

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

export const getState = ()=>(
     async (dispatch,getState)=>(getState())
)

export const getDocFromCollectionRT= async (coll, docum) => {
    //realtime update
    const db = firebase.firestore();
    const docRef = await doc(db, coll, docum);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return {}
    }
}


export const updateAuthProfile = async (user, model) => {
    let res = await updateProfile(user, model)
}

export const getBusArriveState = async (dispatch,setState)=>{
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            let {type} = await getDocFromCollection('userProfile', user?.uid)
            if (type == 'passenger') {
                let abc = getLongAndLatOfUserRequest(user?.uid).then(({holt_location_object, current_location_obect_bus,bus_no}) => {
                        let abc = getDistanceFromLatLonInm(holt_location_object?.lat, holt_location_object?.lng, current_location_obect_bus?.lat, current_location_obect_bus?.lng)
                        if (abc < 200) {
                           setState({busno:bus_no,arravi:true})
                        }
                    })
                }
        }
    });
}
export const createDocOfCollection = async (collName, data) => {
    const db = firebase.firestore();
    const docRef = await addDoc(collection(db, collName), data);
    return docRef.id
}

export const createDocOfCollectionWithId = async (collName, id, data) => {
    const db = firebase.firestore();
    const docRef = await setDoc(doc(db, collName, id), data);
}

export const deleteDocument = async (collection,document) => {
    const db = firebase.firestore();
    await deleteDoc(doc(db, collection, document));
}

export const updateProfilePhoto = async (file, currentUser) => {
    const storage = getStorage();
    const fileRef = ref(storage, `usersProfilePhotos/${currentUser.uid}.png`);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser, {photoURL});
    alert("Uploaded file!");
}
//
// export const updateDoc = async (id,collec, model) => {
//     const db = firebase.firestore();
//     // await setDoc(doc(db, "accounts", id), model);
//     const accountRef = doc(db, collec, id);
//     await setDoc(accountRef, model, {merge: true});
// }

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
    await setDoc(doc(db, col, docum), data,{merge: true});
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

export const filterDocsFromCollectionRT = async (coll, fields, filters,callBack) => {
    //real time update
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

    onSnapshot(queryData, (querySnapshot) => {
        let array = []
        for (let document of querySnapshot.docs) {
                array.push({...document.data(), id: document.id})
            }
        callBack(array)
    });
}

function getDistanceFromLatLonInm(lat1, lon1, lat2, lon2) {
    const earthRadiusM = 6371000;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusM * c;

    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

async function getLongAndLatOfUserRequest(id) {
    try {
        let pickupHolt = (await filterDocsFromCollection('userRequests', [], [["user_id", "==", String(id)], ["status", "==", "waiting"]]))
        let holts_locations = (await getDocFromCollection('busHolts', pickupHolt[0]?.pickUp_holt))?.location
        let holt_location_object = holts_locations ? JSON.parse(holts_locations) : {}
        let {current_location:current_bus_location,bus_no=''} = (await getDocFromCollection('bus', pickupHolt[0]?.bus_id))
        let current_location_obect_bus = current_bus_location ? JSON?.parse(current_bus_location) : {}
        return {holt_location_object: holt_location_object, current_location_obect_bus: current_location_obect_bus,bus_no}

    } catch (e) {
        console.log(e)
    }

}

