/** 
 * @module lesesirkel.getAllMembers
 */

/**
 * function getting all the members
 * @function
 * @param {string} token - the token
 */

const getAllMembers = async function (token) {

    const url = 'https://api.noroff.dev/api/v1/social/profiles' ;
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
        const allMembers = await res.json();
        return allMembers;   
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};


module.exports = getAllMembers;