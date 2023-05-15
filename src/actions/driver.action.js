import {getDocFromCollection} from "./common.action";

export const rebuildUserRequsets = async (requestList) => {
    let array = []
    for (let request of requestList) {
        let holtnameAndLocation = request?.pickUp_holt ? await getDocFromCollection('busHolts', request?.pickUp_holt) : ''
        let userName = (await getDocFromCollection('userProfile', request?.user_id))?.fullName || ''
        array.push({...holtnameAndLocation, userName: userName, ...request})
    }
    return array
}

export const rebuildUserFeedBack = async (feedBacks) => {
    let array = []
    for (let feedback of feedBacks) {
        let userName = (await getDocFromCollection('userProfile', feedback?.user_id))?.fullName || ''
        array.push({userName: userName, ...feedback})
    }
    return array
}