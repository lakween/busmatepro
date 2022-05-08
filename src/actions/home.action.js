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
            //setHoltLocation(locationsArray || [])
            return locationsArray || []
        } else {
            return []
            // setHoltLocation([])
            // setHolts(array)
        }
    }

}

export const getBusLocations = (routes, eventValue) => {
    return async (dispatch) => {
        const db = firebase.firestore();

        const busRoutRef = firebase.firestore()
            .collection('bus routs')
            .doc(eventValue);

        const bus = await collection(db, "bus");
        const query = await query(bus, where("route", "==", busRoutRef));
        const querySnapshot = await getDocs(query)
        for (let doc of querySnapshot.docs) {
            console.log(doc.id, " => ", doc.data());
            if (doc.data().current_holt) {
                const userRef = await doc.data().current_holt;
                let data = await getDoc(userRef)
                console.log(data.data())
            }
        }
    }
}