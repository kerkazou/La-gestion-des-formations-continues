const router = require('express').Router();

const authController = require('../controllers/authControllers');
const formationControllers = require('../controllers/formationControllers');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');
const uploadImage = require('../middlewares/uploadImage');


router.post('/ddd-employee', tryCatch(authController.AddEmployee));
router.post('/add-formation', uploadImage.single('image'), tryCatch(formationControllers.AddFormation));

router.use(errorHandller);


module.exports = router;