import {getDocFromCollection} from "./common.action";

export const getHoltLocations = (routes,eventValue) => {
    return async (dispatch) => {
        let array = []
        let holtsRef = await routes?.find((route) => route.id == eventValue).holts
        if (holtsRef) {
            for (let holt of holtsRef) {
                let holtData = await dispatch(getDocFromCollection('bus holts', holt.id))
                array.push(holtData)
            }
            console.log(array, 'array')
            let locationsArray = []
            for (let item of array) {
                if (item.location) {
                    locationsArray.push({latLng: JSON.parse(item.location)})
                }
            }
            //setHoltLocation(locationsArray || [])
            return locationsArray || []
        } else {
            return []
           // setHoltLocation([])
            // setHolts(array)
        }
    }

}