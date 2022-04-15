import React, {useRef, useState} from "react";



const Map = ()=>{
    const ref = useRef(null);
    const [map, setMap] = useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    return(
        <div ref={ref} />
    )
}

