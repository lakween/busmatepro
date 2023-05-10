import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import firebase from "firebase/compat/app";
import {useNavigate} from "react-router-dom";
import {getDocFromCollection} from "../actions/common.action";

const useUserLoginInfo = () => {
    let navigate = useNavigate()
    let [model, setModel] = useState()

    useEffect(() => {
        setUsr()
    }, [])

    async function setUsr() {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                let userData = await getDocFromCollection('userProfile', user?.uid);
                setModel({...userData, id: user?.uid, isLogged: true,photoURL:user?.photoURL});

            } else {

                setModel({isLogged: false});
                navigate('/')
            }
        });
    }

    return model

}

export default useUserLoginInfo