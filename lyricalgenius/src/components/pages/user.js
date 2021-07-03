// Component will allow for tracking of user across application

let Account = (function (){

    // Account fields
    let username = "";

    // Account getters
    let getUsername = () => {
        return username;
    }

    // Account setters
    let setUsername = (name) => {
        username = name;
    }

    // Returned functions
    return {
        getUsername: getUsername,
        setUsername: setUsername
    }

}) ();

export default Account;