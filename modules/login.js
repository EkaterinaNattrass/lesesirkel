/** 
 * @module lesesirkel.login
 */

/**
 * function logging inthe user
 * @function
 * @param {object} userData - the email and the  password of the user
 */

const loginUser = async function (userData) {
    
    const url = 'https://api.noroff.dev/api/v1/social/auth/login';

    returnObj = {
        "success": false,
        "userName": "",
        "token" : "",
        "error": null
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        statusCode = res.status;
        
        if (statusCode === 200) {
            returnObj.success = true;
            returnObj.userName = data.name;
            returnObj.token = data.accessToken;
        } else {
            returnObj.error = data.errors[0].message;
            console.log('error: ' + JSON.stringify(data));
        }
    }
    catch (err) {
        console.log('error: ' + err + err.status);
        returnObj.error = JSON.stringify(err);
    }

    return returnObj;
};

module.exports = loginUser;