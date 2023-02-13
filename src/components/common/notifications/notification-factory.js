import {getAuth} from "firebase/auth";
import {filterDocsFromCollection, getDocFromCollection} from "../../../actions/common.action";

class passengerNotificationFactory {

    constructor() {

        let {currentUser} = getAuth()
        this.id = currentUser?.uid;
        this.start()
    }

    start() {
        this.getUserType().then((user) => {
                if (user == 'passenger') {
                    this.getCurrentProgessingRequest().then()
                }
            }
        )
    }

    async getUserType() {
        let user = await getDocFromCollection('userProfile', this.id)
        return user?.type
    }

    async getCurrentProgessingRequest() {
        console.log(this.id,'his.id')
        let result = await filterDocsFromCollection('user requests', [], [["user_id", "==", String(this.id)]])
        console.log(result,'result')
    }
}

export default passengerNotificationFactory