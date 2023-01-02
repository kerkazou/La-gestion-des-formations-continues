const router = require('express').Router();

const authController = require('../controllers/authControllers');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');


router.post('/login', tryCatch(authController.login));
router.get('/logout', tryCatch(authController.logout));

router.use(errorHandller);


module.exports = router;