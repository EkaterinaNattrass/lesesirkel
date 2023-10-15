/** 
 * @module lesesirkel.writePost
 */

const writePost = async function(postData, token) {

    const url = 'https://api.noroff.dev/api/v1/social/posts';

    const bearerToken = 'Bearer ' + token;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken
        },
        body: JSON.stringify(postData) 
    };

    try {
        const res = await fetch(url, options);
        const postData = await res.json();
        statusCode = res.status;
        console.log(postData);
        return statusCode === 200;
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
}
 
module.exports = writePost;