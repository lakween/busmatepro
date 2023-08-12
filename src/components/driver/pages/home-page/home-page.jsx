import RequestHistory from "./components/request-history";
import RatingsFeedback from "./components/feed-back";
import {useEffect} from "react";
import {getDocFromCollection, updateDocument} from "../../../../actions/common.action";
import useUserLoginInfo from "../../../../hooks/useLoginInfor";

const DriverHomePage = () => {

    let userDetails = useUserLoginInfo()

    useEffect(() => {
        if (userDetails?.id) {
            // saveBusLoaction()
        }
        return () => {

        }
    }, [userDetails?.id])

    const saveBusLoaction = async () => {
        let {bus_id} = await getDocFromCollection('driverByBus', userDetails?.id?.trim())
        getUserLocation(bus_id)
    }

    function getUserLocation(bus_id) {
        if (bus_id) {
            setInterval(() => {
                navigator?.geolocation?.getCurrentPosition(successCallback(bus_id), errorCallback, options);
            }, [10000])
        }
    }

    const options = {
        enableHighAccuracy: true,
    };
    const successCallback = (bus_id) => {
        return async (position) => {
            updateDocument('bus', bus_id, {
                current_location: JSON.stringify({
                    "lat": position?.coords?.latitude,
                    "lng": position?.coords?.longitude
                })
            })
        }
    };

    const errorCallback = (error) => {
        console.log(error);
    };


    const updateBusLocation = async () => {

    }


    return (
        <div className={'w-full p-5'}>
            <RequestHistory/>
            <RatingsFeedback/>
        </div>
    )
}

export default DriverHomePage