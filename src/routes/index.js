const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html', { title : 'UN Wallet' });
});

router.get('/login', (req, res) => {
    res.render('login.html', { title : 'Log in' });
});

router.get('/signup', (req, res) => {
    res.render('signup.html', { title : 'Sign up' });
});

// Export module
module.exports = router;