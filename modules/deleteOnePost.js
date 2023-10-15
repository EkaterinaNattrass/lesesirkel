/** 
 * @module lesesirkel.deleteOnePost
 */

/**
 * function deleting one post
 * @function
 * @param {string} id - the id of the user
 * @param {string} token - the token
 */

const deleteOnePost = async function(id, token) {

    url = 'https://api.noroff.dev/api/v1/social/posts/' + id; 
    const bearerToken = 'Bearer ' + token;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        }
    };

    try {
        const res = await fetch(url, options);
        const deletedPost = await res.json();  
        return deletedPost;
    } catch {
        console.log('error:' + err + err.status);
    }
}

module.exports = deleteOnePost;

