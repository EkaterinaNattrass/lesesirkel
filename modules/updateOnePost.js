/** 
 * @module lesesirkel.updateOnePost
 */

/**
 * function edititng a post 
 * @function
 * @param {object} updatedPostData - the edited post
 * @param {string} id - the id of the user
 * @param {string} token - the token
 */

const updateOnePost = async function(updatedPostData, id, token) {

        const url = 'https://api.noroff.dev/api/v1/social/posts/' + id;
    
        const bearerToken = 'Bearer ' + token;
    
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearerToken
            },
            body: JSON.stringify(updatedPostData) 
        };
    
        try {
            const res = await fetch(url, options);
            const updatedPostData = await res.json();
            statusCode = res.status;
            console.log(updatedPostData);
            return statusCode === 200;
        }
        catch (err) {
            console.log('error:' + err + err.status);
            return false;
        }
    }

module.exports = updateOnePost;