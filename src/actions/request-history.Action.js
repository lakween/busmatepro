import firebase from "firebase/compat/app";
import {collection, getDoc, getDocs, query, where} from "firebase/firestore";

export const getRequests = () => {
    return async (dispatch) => {
        const db = firebase.firestore();
        let arr = []
        const user_requests = await collection(db, "user requests");
        const queryData = await query(user_requests, where("user_id", "==", 'WlpOBZh8loaBrhkoENh16xjGSrQ2'));
        const querySnapshot = await getDocs(queryData)
        for (let doc of querySnapshot.docs) {

            let Busdata = await getDoc(doc.data().bus_id)
            //let current_holt = await getDoc(await Busdata.data().route)
            //let current =await getDoc(current_holt.data().current_holt)
            //console.log((doc.data().bus_id).id,'current')

            let obj = {
                user_id: doc.data().user_id,
                bus_id: (doc.data().bus_id).id,
                status: doc.data().status,
                bus_no: Busdata.data().bus_no,
                current_holt:(await getDoc(Busdata.data().current_holt)).data().holt_name,
                location: (await getDoc(Busdata.data().current_holt)).data().location
            }
            //console.log(current_holt.data(), 'arr')
             arr.push(obj)
        }
        console.log(arr,'arrdcdvd')
    }
}