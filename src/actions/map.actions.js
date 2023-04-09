import firebase from "firebase/compat/app";


export const getBus = (form) => {
    return async (dispatch) => {
        if (form.start && form.end) {
            const db = firebase.firestore();
            let busRroutes = []

            const startHoltRef = firebase.firestore()
                .collection('busHolts')
                .doc(form.start);

            const endHoltRef = firebase.firestore()
                .collection('busHolts')
                .doc(form.start);

            const files = await firebase
                .firestore()
                .collection('busRouts')
                .where('holts', 'array-contains-any', [startHoltRef, endHoltRef])
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        busRroutes.push(doc.id)
                    });
                })

            busRroutes.map((item) => {
                const busRoutRef = firebase.firestore()
                    .collection('busRouts')
                    .doc(item);
                const files = firebase
                    .firestore()
                    .collection('bus')
                    .where('rou', '==', busRoutRef)
                    .get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                        })
                    })
            })
        }
    }
}