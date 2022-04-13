import {useState} from "react";

export const useComState = (data) => {
    const [state, setState] = useState({})
    return [state, setState]
}