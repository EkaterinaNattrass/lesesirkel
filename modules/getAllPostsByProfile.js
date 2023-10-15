/** 
 * @module lesesirkel.getAllPostsByProfile
 */

/**
 * function getting all the posts created by this user
 * @function
 * @param {string} userName - the name of the user
 * @param {string} token - the token
 */

const getAllPostsByProfile = async function (userName, token) {

    const url = 'https://api.noroff.dev/api/v1/social/profiles/' + userName + '/posts' ;
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
        const allPosts = await res.json();
        return allPosts;   
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};

module.exports = getAllPostsByProfile;