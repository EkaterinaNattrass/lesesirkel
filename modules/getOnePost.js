/** 
 * @module lesesirkel.getOnePost
 */

/**
 * function getting one post by ID
 * @function
 * @param {string} id - the id of the user
 * @param {string} token - the token
 */

const getOnePost = async function (id, token) {

    url = 'https://api.noroff.dev/api/v1/social/posts/' + id;
    const bearerToken = 'Bearer ' + token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        }
    }
        try {
            const res = await fetch(url, options);
            const data = await res.json();  
            return data;
        } catch {
            console.log('error:' + err + err.status);
        }
}

module.exports = getOnePost;