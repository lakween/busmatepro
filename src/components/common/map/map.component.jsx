import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Wrapper} from "@googlemaps/react-wrapper";
import {isLatLngLiteral} from "@googlemaps/typescript-guards";
import {createCustomEqual} from "fast-equals";
import {useDispatch} from "react-redux";
import {setModalPoperty} from "../../../store/reducers/modal-slice";
import {doc, onSnapshot} from "firebase/firestore";
import firebase from "firebase/compat/app";

const render = (status) => {
    return <h1>{status}</h1>;
};

const MapComponent = ({locations, busDetails}) => {
    const dispatch = useDispatch()
    const [clicks, setClicks] = useState([]);
    const [zoom, setZoom] = useState(13); // initial zoom

    // console.log(busDetails,'busDetails')

    // eslint-disable-next-line no-undef

    // const onIdle = (m) => {
    //     setZoom(m?.getZoom());
    //     setCenter(m?.getCenter().toJSON());
    // };

    return (
        <>  <Wrapper apiKey={"AIzaSyB5h2G7hf-wjjrZMJPSRC4HOfQ71WYyvGo"}>
            <Map
                center={locations[0]?.latLng || {
                    lat: 6.5284950413709035,
                    lng: 80.39347518042418
                }}
                //onIdle={onIdle}
                zoom={zoom}
                style={{width: "100%", height: "65vh"}}
            >
                {locations?.map((obj, i) => (
                        <HoltMarker
                            key={i}
                            position={obj.latLng}
                            data={obj.busDetails}
                        />
                    )
                )}
                {busDetails?.map((obj, i) =>
                    (<BusMarker
                        key={i}
                        position={
                            obj?.current_location
                        }
                        data={obj}
                    />))}
            </Map>
        </Wrapper>
        </>
    );
}

const Map = ({
                 onClick,
                 onIdle,
                 children,
                 style,
                 ...options
             }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                // eslint-disable-next-line no-undef
                google.maps.event.clearListeners(map, eventName)
            );
            // eslint-disable-next-line no-undef

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);


    return (
        <>
            <div ref={ref} style={style}/>

            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {map});
                }
            })}
        </>
    );
};

const HoltMarker = (options) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (!marker) {
            // eslint-disable-next-line no-undef
            setMarker(new google.maps.Marker({
                icon: {
                    // eslint-disable-next-line no-undef
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#00F',
                    fillOpacity: 0.6,
                    strokeColor: '#00A',
                    strokeOpacity: 0.4,
                    strokeWeight: 0.5,
                    scale: 7
                },
                title: 'click here for details',
            }));
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null
};

const BusMarker = (options) => {
    let dispatch = useDispatch()
    const db = firebase.firestore();
    const [marker, setMarker] = useState();
    const [location,setLocation] = useState({})

    useEffect(()=>{
        onSnapshot(
            doc(db, "bus", options?.data?.bus_id),
            (doc) => {
                console.log(doc?.data(),'doc?.data()')
                setLocation(doc?.data()?.current_location ? JSON.parse(doc?.data()?.current_location): {})
            });
    },[])

    useEffect(() => {

        if (!marker) {
            // eslint-disable-next-line no-undef
            setMarker(new google.maps.Marker({
                icon: {
                    // eslint-disable-next-line no-undef
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#fc0000',
                    fillOpacity: 0.6,
                    strokeColor: '#fc0000',
                    strokeOpacity: 0.4,
                    strokeWeight: 0.5,
                    scale: 7
                },
                title: `${options.data.available == 'yes' ? '* available' : '* unavailable'} , Bus No: ${options.data.bus_no} ,Avalable Seats :  ${options.data.available_seats}`,
            }));
        }

        marker?.addListener("click", (event) => {
            dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'data', value: options.data}))
            dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'isOpen', value: true}))
        })

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker,options]);

    useEffect(() => {
        if (marker) {
            marker.setOptions({
               ...options,position:location
            });
        }
    }, [marker,location]);

    return null
};

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a, b) => {
        if (
            isLatLngLiteral(a) ||
            // eslint-disable-next-line no-undef
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            // eslint-disable-next-line no-undef
            b instanceof google.maps.LatLng
        ) {
            // eslint-disable-next-line no-undef
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }
        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize(value) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(
    callback,
    dependencies
) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default MapComponent;