const express = require('express');
const router = express.Router();
const uuid = require('uuid');

var users = [];

router.get('/', (req, res) => {
    res.render('index.html', { title : 'UN Wallet' });
});

router.get('/login', (req, res) => {
    res.render('login.html', { title : 'Log in' });
});

router.get('/signup', (req, res) => {
    res.render('signup.html', { title : 'Sign up' });
});

router.get('/wallet', (req, res) => {
    res.render('/wallet.html');
});

router.post('/login', (req, res) => {
    // Acá va la validación con la base de datos
    var flag = false;
    var user = null;

    for(var i = 0; i < users.length; i++) { //búsqueda de la existencia de un usuario (por el momento se trabaja en memoria)
        if(req.body.email == users[i].email && req.body.password == users[i].password) {
            user = users[i];
            flag = true;
            break;
        }
    }

    if(flag) {
        res.render('wallet.html', user);
    } else {
        res.send(400).send('El ususario no existe');
    }  
});

router.post('/signup', (req, res) => {
    // Acá va la validación con la base de datos 
    if(req.body.password != req.body.confirmPassword  || req.body.email != req.body.confirmEmail) {
        res.send(400).send("Las contraseñas y los emails deben ser iguales");
    } else {
        let Wallet_type = {
            wtyp_name : 'Personal',
            wtyp_description : '',
            wtyp_movement_limit : 4000000.0,
            wtyp_month_limit : 20000000.0
        };

        let Wallet = { // Se debe agregar la wallet a la base de datos
            wal_id : uuid.v4(),
            wal_balance : 0.0,
            wal_state : true,
            wal_type : Wallet_type
        };

        let User = { // El usuario debe ser guardado en la base de datos si todo está correcto
            usr_name : req.body.name,
            usr_lastName : req.body.lastName,
            usr_email : req.body.email,
            usr_password : req.body.password,
            usr_wallet : Wallet
        };

        users.push(User);
        res.render('wallet.html', User);
    }
});

// Export module
module.exports = router;