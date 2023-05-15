import RequestHistory from "./components/request-history";
import RatingsFeedback from "./components/feed-back";

const DriverHomePage = () => {

    return (
        <div className={'w-full'}>
            <RequestHistory/>
            <RatingsFeedback/>
        </div>
    )
}

export default DriverHomePage