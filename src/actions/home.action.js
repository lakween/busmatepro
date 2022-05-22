import {getDocFromCollection} from "./common.action";
import firebase from "firebase/compat/app";
import {collection, getDocs, query, where, getDoc} from "firebase/firestore";

export const getHoltLocations = (routes, eventValue) => {
    return async (dispatch) => {
        let array = []
        let holtsRef = await routes?.find((route) => route.id == eventValue).holts
        if (holtsRef) {
            for (let holt of holtsRef) {
                let holtData = await dispatch(getDocFromCollection('bus holts', holt.id))
                array.push(holtData)
            }
            let locationsArray = []
            for (let item of array) {
                if (item.location) {
                    locationsArray.push({latLng: JSON.parse(item.location)})
                }
            }
            return locationsArray || []
        } else {
            return []
        }
    }
}

export const getBusLocations = (routes, eventValue) => {
    return async (dispatch) => {
        const db = firebase.firestore();

        const busRoutRef = firebase.firestore()
            .collection('bus routs')
            .doc(eventValue);
        let busDetails = []
        const bus = await collection(db, "bus");
        const queryData = await query(bus, where("route", "==", busRoutRef));
        const querySnapshot = await getDocs(queryData)
        for (let doc of querySnapshot.docs) {
            if (doc.data().current_holt) {
                const current_holtData = await doc.data().current_holt;
                let data = await getDoc(current_holtData)
                busDetails.push({
                    bus_id: doc.id,
                    bus_no: doc.data().bus_no,
                    available: doc.data().available,
                    available_seats: doc.data().available_seats,
                    current_holt: JSON.parse(data.data().location),
                    selectedRoute:eventValue
                })
            }
        }
        return busDetails
    }
}

export const getHoltsByRoute = (collec,id) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        let data = []
        const snapshot = await db.collection(collec).doc(id).get()
        let holtsRef = snapshot.data().holts
        if (holtsRef) {
            for (let holt of holtsRef) {
                let holtData = await dispatch(getDocFromCollection('bus holts', holt.id))
                data.push(holtData)
            }
            return data
        }
    }
}