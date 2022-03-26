


const createNewUser = async ({ email, password, username }) => {
    let data = {element: "barium"};
    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APIKEY}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email:'test7@gmail.com',
            password:'testing789',
            returnSecureToken:true
        })
    }).then(res => {
        return res;
    });
}