import firebase from "firebase/compat/app";
import {collection, getDoc, getDocs, query, where} from "firebase/firestore";

export const getRequests =  ()=>{
    return async (dispatch)=>{
        const db = firebase.firestore();
        let arr =[]
        const user_requests = await collection(db, "user requests");
        const queryData = await query(user_requests, where("user_id", "==", 'WlpOBZh8loaBrhkoENh16xjGSrQ2'));
        const querySnapshot = await getDocs(queryData)
        for (let doc of querySnapshot.docs) {
            // console.log(doc.data(),'arr')
            const bus_id = await doc.data().bus_id;
            let Busdata = await getDoc(bus_id)
            let current_holt = await getDoc(await Busdata.data().current_holt)
            // console.log(current_holt.data(),'arrdcdvd')
            console.log(Busdata.data(),'arrdcdvd')
            // const bus_id = await doc.data().bus_id;
            // let data = await getDoc(bus_id)
            // arr.push({...doc,...data})
        }

    }
}