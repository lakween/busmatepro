import firebase from "firebase/compat/app";
import {collection, getDoc, getDocs, query, where} from "firebase/firestore";

export const getRequests = () => {
    return async (dispatch) => {
        const db = firebase.firestore();
        let arr = []
        const user_requests = await collection(db, "userRequests");
        const queryData = await query(user_requests, where("user_id", "==", 'WlpOBZh8loaBrhkoENh16xjGSrQ2'));
        const querySnapshot = await getDocs(queryData)
        for (let doc of querySnapshot.docs) {
            let obj = {
                user_id: doc.data().user_id,
                bus_id: (doc.data().bus_id).id,
                status: doc.data().status,
                bus_no: (await getDoc(doc.data().bus_id)).data().bus_no,
                current_holt: (await getDoc((await getDoc(doc.data().bus_id)).data().current_holt)).data().holt_name,
                location: (await getDoc((await getDoc(doc.data().bus_id)).data().current_holt)).data().location
            }
            arr.push(obj)
        }
        return arr
    }
}