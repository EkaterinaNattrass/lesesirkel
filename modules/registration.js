/** 
 * @module lesesirkel.registration
 */

/**
 * function registrating a user
 * @function
 * @param {object} userData - the name, email and paassword of a user
 */

const registerUser = async function (userData) {

    const url = 'https://api.noroff.dev/api/v1/social/auth/register';
    
    returnObj = {
        "success": false,
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
        
        if (statusCode === 201) {
            returnObj.success = true;
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

module.exports = registerUser;