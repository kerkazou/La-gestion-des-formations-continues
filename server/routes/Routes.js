const router = require('express').Router();

const statistiqueControllers = require('../controllers/statistiqueControllers');
const formationControllers = require('../controllers/formationControllers');
const organismeControllers = require('../controllers/organismeControllers');
const employeeControllers = require('../controllers/employeeControllers');
const user_formationControllers = require('../controllers/user_formationControllers');
const uploadImage = require('../middlewares/uploadImage');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');

// Statistique
router.get('/', tryCatch(statistiqueControllers.Statistique));
// Formation
router.get('/formations', tryCatch(formationControllers.GetFormations));
router.post('/add-formation', uploadImage.single('image'), tryCatch(formationControllers.AddFormation));
router.put('/update-formation/:id', uploadImage.single('image'), tryCatch(formationControllers.UpdateFormation));
// Employees
router.get('/employees', tryCatch(employeeControllers.GetEmployees));
router.post('/add-employee', tryCatch(employeeControllers.AddEmployee));
// Organisme
router.get('/organismes', tryCatch(organismeControllers.GetOrganisme));
router.post('/add-organisme', tryCatch(organismeControllers.AddOrganisme));
router.put('/update-organisme/:id', tryCatch(organismeControllers.UpdateOrganisme));
router.delete('/delete-organisme/:id', tryCatch(organismeControllers.DeleteOrganisme));
// Formation Employee
router.get('/formation', tryCatch(user_formationControllers.GetFormation));
router.post('/formation-employee', tryCatch(user_formationControllers.FormationToEmployee));

router.use(errorHandller);


module.exports = router;