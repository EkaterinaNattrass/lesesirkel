/** 
 * @module lesesirkel.getProfile
 */

/**
 * function getting the profile of the user by their name
 * @function
 * @param {string} userName- the name of the user
 * @param {string} token - the token
 */

const getProfile = async function (userName, token) {

    const url = 'https://api.noroff.dev/api/v1/social/profiles/' + userName ;
    const bearerToken = 'Bearer ' + token;

    const options = {
        method: 'GET',
        headers: {  
            'Content-Type': 'application/json',
            Authorization: bearerToken
            },
    };
    
    try {
        const res = await fetch(url, options);
        const profile = await res.json();
        return profile;   
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};

module.exports = getProfile;
