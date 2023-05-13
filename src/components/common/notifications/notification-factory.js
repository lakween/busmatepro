import {getAuth} from "firebase/auth";
import {filterDocsFromCollection, getDocFromCollection, getState} from "../../../actions/common.action";
import firebase from "firebase/compat/app";
import {json} from "react-router-dom";
import {setNotificationSlice} from "../../../store/reducers/notification-slice";
import {setCommonState} from "../../../store/reducers/common-slice";

class passengerNotificationFactory {
    id = ''
    stop = false
    store = {}
    busId = ''
    dispatch

    constructor(dispatch,count) {
        this.dispatch = dispatch
        this.store = count?.commonSlice
        console.log(this.store , 'ttt')
        if(!this.store?.busArravieNotification){
            this.dispatch(setCommonState({stop:true}))

        }

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

    async start(uid) {
        this.getUserType(uid).then(async (user) => {

            }
        )
    }

    async getUserType(uid) {
        let user = await getDocFromCollection('userProfile', uid)
        return user?.type
    }





}

export default passengerNotificationFactory