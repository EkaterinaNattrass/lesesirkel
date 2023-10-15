/** 
 * @module lesesirkel.filterPosts
 */

/**
 * function filtering posts based on their tags
 * @function
 * @param {string} token - the token
 * @param {string} tag - the tag to filter
 */

const filterPosts = async function (token, tag) {

    const url = 'https://api.noroff.dev/api/v1/social/posts?_tag=' + tag;
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
        // only one tag can be  specified in the query params, so filtering further
        const legitPosts = posts.filter ((post) =>  {
            if (post.tags.includes('6c7eeb0e')) {return post}
        })
        return legitPosts;   
    }
    catch (err) {
        console.log('error:' + err + err.status);
        return false;
    }
};

module.exports = filterPosts;