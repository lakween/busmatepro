import {getAuth} from "firebase/auth";
import {filterDocsFromCollection, getDocFromCollection, getState} from "../../../actions/common.action";
import firebase from "firebase/compat/app";
import {json} from "react-router-dom";
import {setNotificationSlice} from "../../../store/reducers/notification-slice";
import {setCommonState} from "../../../store/reducers/common-slice";

class passengerNotificationFactory {
    id = ''
    stop = false
    dispatch

    constructor(dispatch) {
        this.dispatch = dispatch
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
        this.getUserType(uid).then(async (user) => {
                if (user == 'passenger') {
                    let commonSlice = (await (this.dispatch(getState())))?.commonSlice
                    if(!commonSlice?.stop){
                        this.getLongAndLatOfUserRequest().then(async ({holt_location_object, current_location_obect_bus}) => {
                            let abc = this.getDistanceFromLatLonInm(holt_location_object?.lat, holt_location_object?.lng, current_location_obect_bus?.lat, current_location_obect_bus?.lng)
                            if (abc < 200) {
                                this.dispatch(setCommonState({stop:true}))
                                this.stop = true
                            }
                        })
                    }

                }
            }
        )
    }

    async getUserType(uid) {
        let user = await getDocFromCollection('userProfile', uid)
        return user?.type
    }

    async getLongAndLatOfUserRequest() {
        try {
            let pickupHolt = (await filterDocsFromCollection('userRequests', [], [["user_id", "==", String(this.id)], ["status", "==", "waiting"]]))
            let holts_locations = (await getDocFromCollection('busHolts', pickupHolt[0]?.pickUp_holt))?.location
            let holt_location_object = holts_locations ? JSON.parse(holts_locations) : {}
            let current_bus_location = (await getDocFromCollection('bus', pickupHolt[0]?.bus_id))?.current_location
            let current_location_obect_bus = current_bus_location ? JSON?.parse(current_bus_location) : {}
            return {holt_location_object: holt_location_object, current_location_obect_bus: current_location_obect_bus}
        } catch (e) {
            console.log(e)
        }

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
        return deg * (Math.PI / 180)
    }
}

export default passengerNotificationFactory