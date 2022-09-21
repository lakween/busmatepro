import {createDocOfCollection, filterDocsFromCollection, getDocFromCollection} from "./common.action";
import firebase from "firebase/compat/app";
import {collection, getDocs, query, where, getDoc} from "firebase/firestore";

export const getHoltLocations = async (routes, eventValue) => {
    let holtsRef = await routes?.find((route) => route.id == eventValue).holts
    let holtsKey = await getDocFromCollection('bus routs', eventValue)
    let holtLocations = []
    for (let holt of holtsKey?.holts) {
        let result = await getDocFromCollection('bus holts', holt)
        if (result?.location) {
            holtLocations.push({latLng: JSON.parse(result?.location)})
        }
    }
    return holtLocations || []

}

export const getBusLocations = (routes, eventValue) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        let result = await filterDocsFromCollection('bus','',[['route_id','==',eventValue]])
        let busDetails = []
        for (let doc of result) {
            if (doc.current_holt) {
                let data = await createDocOfCollection('bus holts',doc.current_holt)
                busDetails.push({
                    bus_id: doc.id,
                    bus_no: doc.bus_no,
                    available: doc.available,
                    available_seats: doc?.available_seats,
                    current_holt: JSON.parse(data?.location),
                    selectedRoute: eventValue
                })
            }
        }
        return busDetails
    }
}

export const getHoltsByRoute = (collec, id) => {

    return async (dispatch) => {
        const db = firebase.firestore();
        let data = []
        const snapshot = await db.collection(collec).doc(id).get()
        let holtsRef = await snapshot.data()?.holts
        console.log('aaaa', snapshot.data())
        if (holtsRef) {
            for (let holt of holtsRef) {
                let holtData = await dispatch(getDocFromCollection('bus holts', holt.id))
                data.push({...holtData, id: holt.id})
            }
            console.log(data, 'data')
            return data
        }
    }
}