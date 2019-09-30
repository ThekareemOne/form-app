const express = require('express');
const router = express.Router();
 
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
const forms = require('../controllers/form.controller.js');
 
router.post('/register', ctrlUser.register);

router.post('/login', ctrlUser.authenticate);

router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/forms', forms.create);

router.get('/forms', forms.findAll);

router.get('/forms/:formId', forms.findOne);

// Update a Note with formId
router.put('/forms/:formId', forms.update);

router.delete('/forms/:formId', forms.delete);
 
module.exports = router;