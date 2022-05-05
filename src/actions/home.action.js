import {getDocFromCollection} from "./common.action";
import firebase from "firebase/compat/app";
import {collection, getDocs, query, where} from "firebase/firestore";

export const getHoltLocations = (routes,eventValue) => {
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

export const getBusLocations = (routes,eventValue) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        const busRoutRef = firebase.firestore()
            .collection('bus routs')
            .doc(eventValue);

        console.log('wrking')
        // let data = ['']
        // var query =  db.collection("bus").where("route", "==", busRoutRef).get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             // doc.data() is never undefined for query doc snapshots
        //             console.log(doc.id, " => ", doc.data());
        //         });
        //     })
        //     .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //     });;

        const q = query(collection(db, "bus"), where("route", "==", busRoutRef));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });

    }

}