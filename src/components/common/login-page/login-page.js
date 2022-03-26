import { useFirebase } from "react-redux-firebase";

import {useSelector} from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const firebase = useFirebase()
    const auth = useSelector(state => state.firebase.auth);

    const signInWithGoogle = async () => {
       await firebase.login({
                provider: "google",
                type: "popup",
            })
    };
    console.log(auth,'auth')
    return (
        <div>
            <h1>Sign In</h1>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    signInWithGoogle();
                }}
            >
                Sign In with Google
            </button>
        </div>
    );
};

    //
    // const auth = getAuth();
    // const authl = useSelector(state => state.firebase);
    // signInWithEmailAndPassword(auth, 'test@gmail.com', 'test@123')
    //     .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         console.log(authl)
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //     });
    //
    // return (
    //     <div>
    //         <h1>Sign In</h1>
    //         <button
    //             onClick={(event) => {
    //                 event.preventDefault();
    //
    //             }}
    //         >
    //             Sign In with Google
    //         </button>
    //     </div>
    // );

export default Login;