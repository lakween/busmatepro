import {getDocFromCollection} from "./common.action";

export const rebuildMessage = async (messages) => {
    let array = []
    for (let message of messages) {
        let to = (await getDocFromCollection('userProfile', message?.to))?.fullName || ''
        let from = (await getDocFromCollection('userProfile', message?.from))?.fullName || ''
        array.push({...message, to: to, from: from})
    }
    return array
}