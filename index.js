/** Express app providing routes for Lesesirkel app
 * @module lesesirkel
 * @requires express
 */

const express = require('express');
   
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const registerUser = require('./modules/registration');
const loginUser = require('./modules/login');
const getAllPosts = require('./modules/getPosts');
const filterPosts = require('./modules/filterPosts');
const getOnePost = require('./modules/getOnePost');
const deleteOnePost = require('./modules/deleteOnePost');
const updateOnePost = require('./modules/updateOnePost');
const writePost = require('./modules/writePost');
const getProfile = require('./modules/getProfile');
const getAllPostsByProfile = require('./modules/getAllPostsByProfile');
const getAllMembers = require('./modules/getAllMembers');

// a module that brings the Fetch API to Node.js
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

// the directory where the template files are located
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// a built-in middleware function that serves static files
app.use(express.static(__dirname + '/public'));

// a parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// a  middleware that allows you to create sessions in your app
app.use(session({
    secret: 'reading-is-fun',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000, // 1 hour 
    }
}));

// initialising flash-messages
app.use(flash());

//  a function that creates a new middleware to override the req method property with a new value
app.use(methodOverride('_method'));


// Middleware to simulate user login and save an authentication token during development
app.use((req, res, next) => {
    // Simulate a user login by setting a sample authentication token in the session
    // req.session.token = ''; // Replace with the actual authentication token
    // req.session.userName = ''; // Replace with the username
    next();
}); 

/**
 * Route taking the user to the index page
 * @name /
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/', (req, res) => {

    res.render('index', {
        failedLoginMessage: req.flash('loginError'),
        failedRegisterMessage:  req.flash('registerError')
     })
});

/**
 * Route serving registration form.
 * @name /register-form
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/register-form', async (req, res) => {
    res.redirect('/');
});

/**
 * Route posting data from registration form  and logging the user in
 * @name /register-form
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post('/register-form', async (req, res) => {

    const registeredUser = await registerUser(req.body);

    if (!registeredUser.success) {
        req.flash('registerError', registeredUser.error + ' ...Please, try again');
        res.redirect('/');
        return;
    }

    const loggedInUser = await loginUser(req.body);
    if (loggedInUser.success) {
        req.session.token = loggedInUser.token;
        req.session.userName = loggedInUser.userName;
        res.render('home');
    }
    else {
        req.flash('registerError', loggedInUser.error + '...Please, try again');
        res.redirect('/');
    }
});

/**
 * Route serving login form
 * @name /login-form
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/login-form', async (req, res) => {
    res.redirect('/');
});

/**
 * Route posting login data and logging the user in
 * @name /login-form
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post('/login-form', async (req, res) => {
    const loggedInUser = await loginUser(req.body);

    if (loggedInUser.success) {
        req.session.token = loggedInUser.token;
        req.session.userName = loggedInUser.userName;
        res.render('home');
    }
    else {
        req.flash('loginError', loggedInUser.error + '...Please, try again');
        res.redirect('/');
    }
});

/**
 * Route serving the home web-page
 * @name /home
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/home', async (req, res) => {
    res.render('home');
});

/**
 * Route getting all the posts from the API, the profile of the logged in user and the app members
 * @name /english
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/english', async (req, res) => {
    const filteredPosts = await getAllPosts(req.session.token);
    const profile = await getProfile(req.session.userName, req.session.token);
    const members = await getAllMembers(req.session.token);
    res.render('english', { filteredPosts, profile, members });
});

/**
 * Route filtering all the posts under the tag #arrangements and taking the user to the filtered ones
 * @name /arrangements
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/arrangements', async (req, res) => {
    const filteredPosts = await filterPosts(req.session.token, 'arrangements')
    const profile = await getProfile(req.session.userName, req.session.token);
    const members = await getAllMembers(req.session.token);
    res.render('english', { filteredPosts, profile, members });
})

/**
 * Route filtering all the posts under the tag #books and taking the user to the filtered ones
 * @name /books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/books', async (req, res) => {
    const filteredPosts = await filterPosts(req.session.token, 'books')
    const profile = await getProfile(req.session.userName, req.session.token);
    const members = await getAllMembers(req.session.token);
    res.render('english', { filteredPosts, profile, members });
})

/**
 * Route filtering all the posts under the tag #administrator and taking the user to the filtered ones
 * @name /administrator
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/administrator', async (req, res) => {
    const filteredPosts = await filterPosts(req.session.token, 'administrator')
    const profile = await getProfile(req.session.userName, req.session.token);
    const members = await getAllMembers(req.session.token);
    res.render('english', { filteredPosts, profile, members });
})

/**
 * Route serving the search function
 * @name /search
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/search', async (req, res) => {

    const searchTerm = req.query.search;

    if (!searchTerm) { return res.send('Please fill in the search form') }

    const posts = await getAllPosts(req.session.token);
    const filteredPosts = posts.filter((post) => {
        const title = post.title ? post.title.toLowerCase() : '';
        const body = post.body ? post.body.toLowerCase() : '';
        return title.includes(searchTerm.toLowerCase()) || body.includes(searchTerm)
    });

    profile = await getProfile(req.session.userName, req.session.token);
    const members = await getAllMembers(req.session.token);
    res.render('search', { filteredPosts, profile, members });
})

/**
 * Route serving a single post
 * @name /english/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/english/:id', async (req, res) => {
    id = req.params.id;
    post = await getOnePost(id, req.session.token);
    res.render('post', { id })
})

/**
 * Route for writing a new entry in the app
 * @name /write-post
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post('/write-post', async (req, res) => {
    postData = req.body;
    postData.tags = [req.body.tag, '6c7eeb0e']
    delete postData.tag
    success = writePost(postData, req.session.token);
    res.redirect('english');
})

/**
 * Route serving the editing page of a single entry
 * @name /english/:id/edit
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/english/:id/edit', async (req, res) => {
    id = req.params.id;
    post = await getOnePost(id, req.session.token);
    res.render('edit', { id })
})

/**
 * Route editing the entry
 * @name /english/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.put('/english/:id', async (req, res) => {
    id = req.params.id;
    updatedPostData = req.body;
    success = await updateOnePost(updatedPostData, id, req.session.token);
    res.redirect(`${post.id}`)
})

/**
 * Route deleting the entry
 * @name /english/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.delete('/english/:id', async (req, res) => {
    id = req.params.id;
    deletedPost = await deleteOnePost(id, req.session.token);
    res.redirect('/english');
})

/**
 * Route serving the profile
 * @name /profile
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/profile', async (req, res) => {
    const profile = await getProfile(req.session.userName, req.session.token);
    userName = req.session.userName;
    const posts = await getAllPostsByProfile(req.session.userName, req.session.token);
    res.render('profile', { profile, posts })
});

// NORWEGIAN route - the buttons are disabled for the CA, will be working after the deployment in real life 

app.get('/norwegian', async (req, res) => {
    res.render('norwegian');
});


// Heroku deployment; defining the port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

/**
 * Route to listen on port 
 * @function
 * @param {string} port - Local port
 */
app.listen(port, () => {
    console.log('listening on port ' + port)
})