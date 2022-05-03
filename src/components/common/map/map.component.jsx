import * as React from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import {isLatLngLiteral} from "@googlemaps/typescript-guards";
import {useEffect, useRef, useState} from "react";
import {createCustomEqual} from "fast-equals";
import firebase from "firebase/compat/app";
import {collection, getDocs, doc, query, where} from "firebase/firestore";
import {useDispatch} from "react-redux";
import {getBus} from "../../../actions/map.actions";
import {background, Spinner} from "@chakra-ui/react";
import {login} from "../../../actions/user.actions";

const render = (status) => {
    return <h1>{status}</h1>;
};

const MapComponent = ({locations}) => {
        console.log(locations, 'locations')
        const dispatch = useDispatch()
        const [clicks, setClicks] = useState([]);
        const [zoom, setZoom] = useState(13); // initial zoom
        const onClick = (e) => {
            let obj = {latLng: e.latLng, busDetails: {name: 'test', availableSeats: 'test'}}
            console.log(clicks, 'click')
            setClicks([...clicks, obj]);
        };

        // const onIdle = (m) => {
        //     setZoom(m?.getZoom());
        //     setCenter(m?.getCenter().toJSON());
        // };

        return (
            <>  <Wrapper apiKey={"AIzaSyB5h2G7hf-wjjrZMJPSRC4HOfQ71WYyvGo"}>
                <Map
                    center={locations[0]?.latLng ||{
                            lat: 6.5284950413709035,
                            lng: 80.39347518042418
                         }}
                    onClick={onClick}
                    //onIdle={onIdle}
                    zoom={zoom}
                    style={{width: "100%", height: "65vh"}}
                >
                      {locations?.map((obj, i) => {
                          console.log(obj, 'obj')
                         return < HoltMarker
                          key = {i}
                          position = {obj.latLng}
                          data = {obj.busDetails}
                          />
                      })}
                </Map>
            </Wrapper>
            </>
        );
    }
;

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

        marker?.addListener("click", (event) => {
            console.log('clicked', event)
        });
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

        marker?.addListener("click", (event) => {
            console.log('clicked', event)
        });
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