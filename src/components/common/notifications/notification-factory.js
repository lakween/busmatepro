import {getAuth} from "firebase/auth";
import {filterDocsFromCollection, getDocFromCollection} from "../../../actions/common.action";
import firebase from "firebase/compat/app";

class passengerNotificationFactory {
    id = ''
    constructor() {

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.id = user.uid
                this.start(user.uid)
                // let abc = this.getDistanceFromLatLonInm(6.702986,80.387252,6.703022,80.387305)
                // console.log(abc,'abc')
            }
        });
        // firebase.auth().onAuthStateChanged(async function (user) {
        //     if (user) {
        //         // this.id = user.uid
        //         // this.start()
        //         // this.start(user.uid)
        //        // let abc = this.getDistanceFromLatLonInKm(6.702453,80.387305,6.703007,80.387284)
        //        //  console.log(abc,'abc')
        //         this.er()
        //     }
        // });
    }

    start(uid) {
        this.getUserType(uid).then((user) => {
                if (user == 'passenger') {
                    this.getCurrentProgessingRequest().then()
                }
            }
        )
    }

    async getUserType(uid) {
        let user = await getDocFromCollection('userProfile', uid)
        return user?.type
    }

    async getCurrentProgessingRequest() {
        let pickupHolt = (await filterDocsFromCollection('userRequests', [], [["user_id", "==", String(this.id)],["status","==","waiting"]]))[0]?.pickUp_holt
        let holts_locations =
        console.log(pickupHolt,'"waiting"')
    }


    getDistanceFromLatLonInm(lat1, lon1, lat2, lon2) {
        const earthRadiusM = 6371000;

        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadiusM * c;

        return distance;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }
}

export default passengerNotificationFactory