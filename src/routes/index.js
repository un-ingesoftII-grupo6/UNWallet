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

router.post('/login', (req, res) => {
    // Acá va la validación con la base de datos 

    res.send("Ok!");
});

router.post('/signup', (req, res) => {
    // Acá va la validación con la base de datos 
    if(req.body.password != req.body.confirmPassword) {
        res.send(400).send("Las contraseñas no coinciden");
    } else {
        res.send(req.body);
    }
});

// Export module
module.exports = router;