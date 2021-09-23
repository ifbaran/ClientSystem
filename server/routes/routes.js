const express = require('express');
const router = express.Router();
const clientAPIController = require('../controllers/ClientController/ClientAPIController');
const providerAPIController = require('../controllers/ProviderController/ProviderAPIController');

//--------------------------------------------------------------------------------
// # ClientAPIController Routes Begin #
//--------------------------------------------------------------------------------
router.post('/create-client', clientAPIController.createClient);
router.get('/clients', clientAPIController.getAllClients);
router.get('/client/:_id?', clientAPIController.getClientById);
router.delete('/delete-client/:_id?', clientAPIController.deleteClient);
router.patch('/update-client/:_id?', clientAPIController.updateClient);
//--------------------------------------------------------------------------------
// # ClientAPIController Routes End #
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// # ProviderAPIController Routes Begin #
//--------------------------------------------------------------------------------
router.post('/create-provider', providerAPIController.createProvider);
router.get('/providers', providerAPIController.getAllProviders);
router.get('/provider/:_id?', providerAPIController.getProviderById);
router.delete('/delete-provider/:_id?', providerAPIController.deleteProvider);
router.patch('/update-provider/:_id?', providerAPIController.updateProvider);
//--------------------------------------------------------------------------------
// # ProviderAPIController Routes End #
//--------------------------------------------------------------------------------

module.exports = router;