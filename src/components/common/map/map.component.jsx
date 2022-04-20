import React, {useEffect, useRef, useState} from "react";

const MyMapComponent = ()=>{
    const ref = useRef()
    const style ={height:"65vh" , width:"100%"}
    useEffect(()=>{
        new window.google.maps.Map(ref.current,{
            center:{lat : 6.927079 ,lng : 79.861244},
            zoom:5,
        })
    },)
    return <div ref={ref} style={style} id={"map"}/>
}
export default MyMapComponent


