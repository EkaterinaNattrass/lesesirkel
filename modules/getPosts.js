/** 
 * @module lesesirkel.getPosts
 */

/**
 * function getting all the posts
 * @function
 * @param {string} token - the token
 */

const getAllPosts = async function (token) {

    const url = 'https://api.noroff.dev/api/v1/social/posts?_tag=6c7eeb0e';
    const bearerToken = 'Bearer ' + token;
    
    const options = {
        method: 'GET',
        headers: {  
            Authorization: bearerToken
            },
    };
    
    try {
        const res = await fetch(url, options);
        const posts = await res.json();
        return posts;   
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};

module.exports = getAllPosts;