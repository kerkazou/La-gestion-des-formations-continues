const router = require('express').Router();

const statistiqueControllers = require('../controllers/statistiqueControllers');
const formationControllers = require('../controllers/formationControllers');
const organismeControllers = require('../controllers/organismeControllers');
const employeeControllers = require('../controllers/employeeControllers');
const uploadImage = require('../middlewares/uploadImage');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');


router.get('/', tryCatch(statistiqueControllers.Statistique));
router.get('/formation', tryCatch(formationControllers.GetFormation));
router.get('/employee', tryCatch(employeeControllers.GetEmployee));
router.get('/organisme', tryCatch(organismeControllers.GetOrganisme));
router.post('/add-employee', tryCatch(employeeControllers.AddEmployee));
router.post('/add-formation', uploadImage.single('image'), tryCatch(formationControllers.AddFormation));
router.post('/add-organisme', tryCatch(organismeControllers.AddOrganisme));

router.use(errorHandller);


module.exports = router;