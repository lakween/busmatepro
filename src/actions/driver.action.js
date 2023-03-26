import {getDocFromCollection} from "./common.action";

const getRequestList = () => {

}

export const rebuildUserRequsets = async (requestList) => {
    let array = []
    for (let request of requestList) {
        let holtnameAndLocation = request?.pickUp_holt ? await getDocFromCollection('bus holts', request?.pickUp_holt) : ''
        let userName = (await getDocFromCollection('userProfile', request?.user_id))?.fullName || ''
        array.push({...holtnameAndLocation, userName: userName, ...request})
    }
    return array
}