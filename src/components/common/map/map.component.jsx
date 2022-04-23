import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import {useEffect, useRef, useState} from "react";
import {createCustomEqual} from "fast-equals";

const render = (status) => {
    return <h1>{status}</h1>;
};

const MapComponent = () => {
    const [clicks, setClicks] = useState([]);
    const [zoom, setZoom] = useState(8); // initial zoom
    const [center, setCenter] = useState({
        lat: 20,
        lng: 40,
    });

    const onClick = (e) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng]);
    };

    const onIdle = (m) => {
        setZoom(m?.getZoom());
        setCenter(m?.getCenter().toJSON());
    };

    // const form = (
    //     <div
    //         style={{
    //             padding: "1rem",
    //             flexBasis: "250px",
    //             overflow: "auto",
    //             height: "65vh", width: "100%"
    //         }}
    //     >
    //         <label htmlFor="zoom">Zoom</label>
    //         <input
    //             type="number"
    //             id="zoom"
    //             name="zoom"
    //             value={zoom}
    //             onChange={(event) => setZoom(Number(event.target.value))}
    //         />
    //         <br />
    //         <label htmlFor="lat">Latitude</label>
    //         <input
    //             type="number"
    //             id="lat"
    //             name="lat"
    //             value={center.lat}
    //             onChange={(event) =>
    //                 setCenter({ ...center, lat: Number(event.target.value) })
    //             }
    //         />
    //         <br />
    //         <label htmlFor="lng">Longitude</label>
    //         <input
    //             type="number"
    //             id="lng"
    //             name="lng"
    //             value={center.lng}
    //             onChange={(event) =>
    //                 setCenter({ ...center, lng: Number(event.target.value) })
    //             }
    //         />
    //         <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
    //         {clicks.map((latLng, i) => (
    //             <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
    //         ))}
    //         <button onClick={() => setClicks([])}>Clear</button>
    //     </div>
    // );
    {
        console.log('render')}
    return (
        <>
            <Wrapper apiKey={"AIzaSyB5h2G7hf-wjjrZMJPSRC4HOfQ71WYyvGo"} >
                <Map
                    center={center}
                    onClick={onClick}
                    //onIdle={onIdle}
                    zoom={8}
                    style={{ width: "100%", height: "65vh" }}
                >
                    {clicks?.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                    ))}
                </Map>
            </Wrapper>
            {/* Basic form for controlling center and zoom of map. */}
            {/*{form}*/}
        </>
    );
};

const Map = ({
                 onClick,
                 onIdle,
                 children,
                 style,
                 ...options
             }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();
    console.log(map,'map')
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));

        }
    }, [ref, map]);
    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
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
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
};

const Marker = (options) => {
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

                title:'The marker`s title will appear as a tooltip.',
            }));
        }
        marker?.addListener("click", () => {
            alert('clicked')
        });
        // remove marker from map on unmount
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

        // TODO extend to other types

        // use fast-equals for other objects
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
