const express = require('express');
const ServiceController  = require('../controllers/servicio.controller');

const router = express.Router();

//rutas de pruebas
router.post('/datos-servicio', ServiceController.datosServicio);
router.get('/test-de-controlador', ServiceController.test);

// Rutas Utilez
router.post('/save', ServiceController.save);
router.get('/servicios/:last?', ServiceController.getServicies);
router.get('/:id', ServiceController.getService);
router.put('/:id', ServiceController.update);
router.delete('/:id', ServiceController.delete);
router.get('/search/:search', ServiceController.search);

module.exports = router;
