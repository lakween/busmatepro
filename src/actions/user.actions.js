import firebase from "firebase/compat/app";
import {collection, getDocs} from "firebase/firestore";
import {createDocOfCollectionWithId} from "./common.action";

export const googleSignUp = async (navigate) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    let result = await firebase.auth().signInWithPopup(provider)
    const [first_name, last_name] = result.user.displayName ? result.user.displayName?.split(" ") : ['', '']
    return {email: result.user.email, first_name: first_name, last_name: last_name, reference_doc_id: result?.user?.uid}
}

export const createDoc = async (collection, toast, navigate, form) => {
    try {
        console.log(form,form)
        let result = await createDocOfCollectionWithId('userProfile', form?.id, form)

        navigate()
        toast({
            title: 'Account created.',
            description: "We've update your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const emailAndPasswordAuth = async (email, password, toast) => {
    try {
        let result = await firebase.auth().createUserWithEmailAndPassword(email, password)
        return result?.user?.uid
    } catch (e) {
        toast({
            title: 'Something wrong',
            description: [...e.message.split(":")][1],
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        return false
    }
    // catch((error) => {
    //
    //     return false
    // });
}

export const signOut = (navigate) => {
    return firebase.auth().signOut().then(() => {
        navigate("/")
    }).catch((error) => {
    });
}

export const login = (form, navigate) => {
    return async (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(form.username, form.password)
            .then((userCredential) => {
                navigate('/user')
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