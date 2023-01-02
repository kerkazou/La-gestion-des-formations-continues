const router = require('express').Router();

const formationControllers = require('../controllers/formationControllers');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');
const { userPermission } = require('../middlewares/Permission');
const uploadImage = require('../middlewares/uploadImage');


router.post('/add-formation', uploadImage.single('image'), tryCatch(formationControllers.AddFormation));

router.use(errorHandller);


module.exports = router;