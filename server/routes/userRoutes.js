const router = require('express').Router();
const userController = require('../controllers/userControllers');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');
const permission = require('../middlewares/Permission');


router.get('/manager/me', permission.userPermission, tryCatch(userController.manager));
router.get('/livreur/me', permission.userPermission, tryCatch(userController.livreur));
router.get('/client/me', permission.userPermission, tryCatch(userController.client));

router.use(errorHandller);

module.exports = router;