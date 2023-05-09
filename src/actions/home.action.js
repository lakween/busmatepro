import {createDocOfCollection, filterDocsFromCollection, getDocFromCollection} from "./common.action";
import firebase from "firebase/compat/app";
import {collection, getDocs, query, where, getDoc} from "firebase/firestore";

export const getHoltLocations = async (routes, eventValue) => {
    let holtsRef = await routes?.find((route) => route.id == eventValue).holts
    let holtsKey = await getDocFromCollection('busRoutes', eventValue)
    let holtLocations = []
    for (let holt of holtsKey?.holts) {
        let result = await getDocFromCollection('bus holts', holt)

        if (result?.location) {
            holtLocations.push({latLng: JSON.parse(result?.location)})
        }
    }
    return holtLocations || []

}


export const getBusLocations = async (routes, eventValue) => {
        const db = firebase.firestore();
        let result = await filterDocsFromCollection('bus', '', [["route_id", '==', eventValue]])
        let busDetails = []
        for (let doc of result) {
            if (doc.current_holt) {
                let data = await getDocFromCollection('bus holts', doc.current_holt)
                busDetails.push({
                    bus_id: doc.id,
                    bus_no: doc.bus_no,
                    available: doc.available,
                    available_seats: doc?.available_seats,
                    selectedRoute: eventValue
                })
            }
        }
    console.log(busDetails,'busdetails')
        return busDetails
}

export const getHoltsByRoute = async (collec, id) => {
    let result = await getDocFromCollection(collec, id)
    let holts = []
    if (result.holts) {
        for (let holt of result?.holts) {
            let result = await getDocFromCollection('bus holts', holt)
            holts.push({...result, holt_id: holt})
        }
    }
    return holts
}