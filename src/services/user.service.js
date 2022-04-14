import firebase from "firebase/compat/app";

export const googleSignUp = async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    let result = await firebase.auth().signInWithPopup(provider).then(function (result) {
        return {email: result.user.email, user_name: result.user.displayName}
    }).catch(function (error) {
        return {success: false}
    });
    return result
}

export const createDoc = (collection, toast, navigate, form) => {
    const db = firebase.firestore();
    return db.collection(collection).add(form)
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

export const emailAndPasswordAuth = (email, password,toast) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
           return true
        })
        .catch((error) => {
            toast({
                title: 'Something wrong',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return false
        });
}

export const signOut = () => {
    return firebase.auth().signOut().then(() => {
        console.log('sucsess')
    }).catch((error) => {
        console.log('not')
    });
}

export const login = (form,navigate) => {
    return firebase.auth().signInWithEmailAndPassword(form.username, form.password)
        .then((userCredential) => {
            // Signed in
            console.log('succ')
            navigate('/passenger')
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

export const checkEmailExist = (form) => {
    return firebase.auth().signInWithEmailAndPassword(form.username, form.password)
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

