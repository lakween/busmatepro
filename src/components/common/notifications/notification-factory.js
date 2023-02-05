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
        let result = await filterDocsFromCollection('user requests', '', [['user_id' == this.id]])
        console.log(result, 'User')
    }
}

export default passengerNotificationFactory