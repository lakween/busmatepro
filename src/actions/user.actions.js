import firebase from "firebase/compat/app";
import {collection, getDocs} from "firebase/firestore";

export const googleSignUp = async (navigate) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    let result = await firebase.auth().signInWithPopup(provider)
    const [first_name, last_name] = result.user.displayName ? result.user.displayName?.split(" ") : ['', '']
    return {email: result.user.email, first_name: first_name, last_name: last_name, reference_doc_id: result?.user?.uid}
}

export const createDoc = (collection, toast, navigate, form) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        db.collection(collection).add(form)
            .then((docRef) => {
                toast({
                    title: 'Account created.',
                    description: "We've update your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                navigate()
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                return {}
            });
    }
}

export const emailAndPasswordAuth = (email, password, toast) => {
    return async (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return true
            })
            .catch((error) => {
                console.log((JSON.stringify(error)))
                toast({
                    title: 'Something wrong',
                    description: [...error.message.split(":")][1],
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                return false
            });
    }
}

export const signOut = () => {
    return firebase.auth().signOut().then(() => {
    }).catch((error) => {
    });
}

export const login = (form, navigate) => {
    return async (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(form.username, form.password)
            .then((userCredential) => {
                navigate('/passenger')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}

export const checkEmailExist = (form) => {
    return async (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(form.username, form.password)
            .then((userCredential) => {
                // Signed in
                console.log('succ')
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}

export const getAllDocuments = (CollectionName) => {
    return async (dispatch) => {
        let data = []
        const db = firebase.firestore();
        const querySnapshot = await getDocs(collection(db, CollectionName))
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({id: doc.id, ...doc.data()})
        });
        return data
    }
}