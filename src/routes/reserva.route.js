const express = require('express');
const ReserveController  = require('../controllers/reserva.controller');

const router = express.Router();

//rutas de pruebas
router.post('/datos-servicio', ReserveController.datosReserva);
router.get('/test-de-controlador', ReserveController.test);

// Rutas Utilez
router.post('/save', ReserveController.save);
router.get('/servicios/:last?', ReserveController.getReserves);
router.get('/:id', ReserveController.getReserve);
router.put('/:id', ReserveController.update);
router.delete('/:id', ReserveController.delete);
router.get('/search/:search', ReserveController.search);



module.exports = router;
