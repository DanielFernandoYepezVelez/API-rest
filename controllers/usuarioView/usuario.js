const { Router } = require('express');
const router = Router();

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

router.get('/signin', (req, res) => {
    res.render('user/signin');
});

module.exports = router;