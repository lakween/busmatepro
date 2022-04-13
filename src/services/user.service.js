import firebase from "firebase/compat/app";
import {useSelector} from "react-redux";

export const googleSignUp = async () => {

    let provider = new firebase.auth.GoogleAuthProvider();
    let result = await firebase.auth().signInWithPopup(provider).then(function (result) {
        return {email: result.user.email, user_name: result.user.displayName}
    }).catch(function (error) {
        return {success: false}
    });
    return result
}

// const createNewUser = async ({ email, password, username }) => {
//     let data = {element: "barium"};
//     await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APIKEY}`, {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             email:'test7@gmail.com',
//             password:'testing789',
//             returnSecureToken:true
//         })
//     }).then(res => {
//         return res;
//     });
// }