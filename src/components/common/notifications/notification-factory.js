import {getAuth} from "firebase/auth";
import {filterDocsFromCollection, getDocFromCollection} from "../../../actions/common.action";
import firebase from "firebase/compat/app";

class passengerNotificationFactory {
    id = ''
    constructor() {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                // this.id = user.uid
                // this.start()
                this.start(user.uid)
            }
        });
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
        console.log(this.id,'his.id')
        let result = await filterDocsFromCollection('user requests', [], [["user_id", "==", String(this.id)]])
        console.log(result,'result')
    }
}

export default passengerNotificationFactory