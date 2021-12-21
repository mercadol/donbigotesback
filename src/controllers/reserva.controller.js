const validator = require('validator');
const Reserva = require('../models/reserva.model');


const controller = {
    datosReserva: (req, res) => {
      const hola = req.body.hola;
      console.log('Hola Mundo');
      return res.status(200).send({
        codigo:'1',
        idservicio:'un id unico',
        idcolaborador: 'un id unico',
        idcliente: 'un id unico',
        estado: 'solicitada',
        calificacion: 5,
        resenias: 'buen servicio',
        hola
      });
    },
    test:(req, res) => {
      return res.status(200).send({
        message: 'Soy la accion test de mi controlador de Reserva'
      });
    },
  
    save: (req, res) => {
      //Recoger parametros por post
      const params = req.body; // averiguar como se envia este objeto
      // Validar datos (Validator)
      try {
        var validate_codigo = !validator.isEmpty(params.codigo);
        var validate_idservicio = !validator.isEmpty(params.idservicio);
        var validate_idcolaborador = !validator.isEmpty(params.idcolaborador);
        var validate_idcliente = !validator.isEmpty(params.idcliente);        
      } catch (err) {
        return res.status(200).send({
          status: 'error',
          menssage: 'faltan datos por enviar!'
        });
      }
  
      if (validate_codigo && validate_idservicio && validate_idcliente && validate_idcolaborador) {
        //Crear el objeto a guardar
        var reserve = new Reserva();
        //Asignar valores
        reserve.codigo = params.codigo;
        reserve.idservicio = params.idservicio;
        reserve.idcolaborador = params.idcolaborador;
        reserve.idcliente = params.idcliente;
        if(params.estado){
          reserve.estado=params.estado;
        }else{
            reserve.duracion = 'solicitada';
        }
  
        if(params.fecha){
            reserve.fecha=params.fecha;
        }else{
            reserve.fecha = Date.now;
        }
        
        if(params.calificacion){
            reserve.calificacion=params.calificacion;
        }else{
            reserve.calificacion = 0;
        }
        
        if(params.resenias){
          reserve.resenias=params.resenias;
        }else{
          reserve.resenias = '';
        }
        //Guardar reserve
        reserve.save((err, reserveStored)=>{
          if(err || !reserveStored){
            return res.status(404).send({
              status: 'error',
              menssage: 'la reserve no se a guardado'
            });
          }else {
            //Devolver una respuesta.
            return res.status(200).send({
              status: 'success',
              reserve: reserveStored
            });
          }
        });
  
      } else {
        return res.status(200).send({
          status: 'error',
          menssage: 'los datos no son validos'
        });
      }
  
    },
  
    getReserves: (req, res) => {
  
      var querty = Reserva.find({});
      var last = req.params.last;
      if (last || last != undefined){
        querty.limit(5);
      }
      // find
      // con sort puedo ordenar la lista resultante de la busqueda
      /**************DECIDIR PATRON DE ORDENAMIENTO*********************
       * PUEDE SER POR CODIGO O POR FECHA O POR ESTADOS************* */
      querty.sort('-_id').exec((err, reservas) =>{
        if (err) {
          return res.status(500).send({
            status: 'error',
            menssage: 'Error al devolver Las reservas'
          });
        }
        if (!reservas) {
          return res.status(404).send({
            status: 'error',
            menssage: 'Error, no hay reservas para mostrar'
          });
        }
        return res.status(200).send({
          status: 'success',
          reservas
        });
      });
  
    },
    getReserve: (req, res) => {
      //Recoger el id de la url
      var reserveId = req.params.id;
      //comprobar que existe
      if (!reserveId || reserveId == null) {
        return res.status(404).send({
          status: 'error',
          menssage: 'No existe la Reserva'
        });
      }
      //buscar el servicio
      Reserva.findById(reserveId, (err, reservas) => {
        if (err) {
          return res.status(500).send({
            status: 'error',
            menssage: 'Error al devolver los datoss'
          });
        }
        if (!reservas) {
          return res.status(404).send({
            status: 'error',
            menssage: 'no existe el servicio'
          });
        }
        //devolver
        return res.status(200).send({
          status: 'success',
          reservas
        });
      });
    },
    update: (req, res) => {
      //Recoger el id de la url
      var reserveId = req.params.id;
      // Los datos que llegan por put
      var params = req.body;
      //validar datos
      try {
        var validate_codigo = !validator.isEmpty(params.codigo);
        var validate_idservicio = !validator.isEmpty(params.idservicio);
        var validate_idcolaborador = !validator.isEmpty(params.idcolaborador);
        var validate_idcliente = !validator.isEmpty(params.idcliente);        
      } catch (err) {
        return res.status(200).send({
          status: 'error',
          menssage: 'faltan datos por enviar!'
        });
      }
      if (validate_codigo && validate_idservicio && validate_idcliente && validate_idcolaborador) {
        //Find update
        Reserva.findOneAndUpdate({_id: reserveId}, params, {new:true}, (err, reserveUdated) => {
          if (err){
            return res.status(500).send({
              status: 'error',
              menssage: 'Error al actualizar!!'
            });
          }
          if (!reserveUdated){
            return res.status(404).send({
              status: 'error',
              menssage: 'No existe la Reserva!!'
            });
          }
          return res.status(200).send({
            status: 'success',
            reserve: reserveUdated
          });
        });
      }else {
        return res.status(200).send({
          status: 'error',
          menssage: 'La validacion no es correcta!!'
        });
      }
      return res.status(404).send({
        status: 'error',
        menssage: 'No existe la reserva'
      });
    },
  
    delete: (req, res) => {
      // Recoger el id de la url
      var reserveId = req.params.id;
      // Find and delete
      Reserva.findOneAndDelete({_id: reserveId}, (err, reserveRemoved) =>{
        if(err){
          return res.status(500).send({
            status: 'error',
            menssage: 'Error al borrar!!'
          });
        }
        if(!reserveRemoved){
          return res.status(404).send({
            status: 'error',
            menssage: 'No se a borrado la reserva, posiblemente no exista!!'
          });
        }
        return res.status(200).send({
          status: 'success',
          menssage: 'la reserva fue eliminada',
          reserve: reserveRemoved
        });
      });
  
    },//borrar
  
    search: (req, res) => {
      var searchString = req.params.search;
      //find
      Servicio.find({ "$or":[
        {"codigo": {"$regex": searchString, "$options": "i"}},
        {"idservicio": {"$regex": searchString, "$options": "i"}},
        {"idcolaborador": {"$regex": searchString, "$options": "i"}},
        {"idcliente": {"$regex": searchString, "$options": "i"}},
        {"estado": {"$regex": searchString, "$options": "i"}}
      ]})
      .sort([['date', 'descending']])
      .exec((err, reserves) =>{
  
        if(err){
          return res.status(500).send({
            status: 'error',
            message: 'existe un error en la peticion!!',
          });
        }
  
        if(!reserves || reserves.length <= 0){
          return res.status(404).send({
            status: 'error',
            message: 'No existe una reserva que coincida con tu buquea',
          });
        }
  
        return res.status(200).send({
          status: 'success',
          reserves
        });
      });
    }
  
  };



module.exports = controller;
