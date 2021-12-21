const validator = require('validator');
const Servicio = require('../models/servicio.model');


// traer modelos
const controller = {
  datosServicio: (req, res) => {
    const hola = req.body.hola;
    console.log('Hola Mundo');
    return res.status(200).send({
      codigo:'1',
      name:'depilacion',
      costo: 10000,
      duracion: '1h',
      descripcion: '',
      hola
    });
  },
  test:(req, res) => {
    return res.status(200).send({
      message: 'Soy la accion test de mi controlador de articulos'
    });
  },

  save: (req, res) => {
    //Recoger parametros por post
    const params = req.body; // averiguar como se envia este objeto
    // Validar datos (Validator)
    try {
      var validate_codigo = !validator.isEmpty(params.codigo);
      var validate_name = !validator.isEmpty(params.name);
      var validate_costo = !validator.isEmpty(params.costo);
      
    } catch (err) {
      return res.status(200).send({
        status: 'error',
        menssage: 'faltan datos por enviar!'
      });
    } finally {

    }

    if (validate_codigo && validate_name && validate_costo) {
      //Crear el objeto a guardar
      var service = new Servicio();
      //Asignar valores
      service.codigo = params.codigo;
      service.name = params.name;
      service.costo = params.costo;
      if(params.duracion){
        service.duracion=params.duracion;
      }else{
        service.duracion = '1h';
      }

      if(params.descripcion){
        service.descripcion=params.descripcion;
      }else{
        service.descripcion = '';
      }
      
      //Guardar service
      service.save((err, serviceStored)=>{
        if(err || !serviceStored){
          return res.status(404).send({
            status: 'error',
            menssage: 'el Servicio no se a guardado'
          });
        }else {
          //Devolver una respuesta.
          return res.status(200).send({
            status: 'success',
            service: serviceStored
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

  getServicies: (req, res) => {

    var querty = Servicio.find({});
    var last = req.params.last;
    if (last || last != undefined){
      querty.limit(5);
    }
    // find
    // con sort puedo ordenar la lista resultante de la busqueda
    querty.sort('-_id').exec((err, servicios) =>{
      if (err) {
        return res.status(500).send({
          status: 'error',
          menssage: 'Error al devolver los servicios'
        });
      }
      if (!servicios) {
        return res.status(404).send({
          status: 'error',
          menssage: 'Error, no hay servicios para mostrar'
        });
      }
      return res.status(200).send({
        status: 'success',
        servicios
      });
    });

  },
  getService: (req, res) => {
    //Recoger el id de la url
    var serviceId = req.params.id;
    //comprobar que existe
    if (!serviceId || serviceId == null) {
      return res.status(404).send({
        status: 'error',
        menssage: 'No existe el Servicio'
      });
    }
    //buscar el servicio
    Servicio.findById(serviceId, (err, servicios) => {
      if (err) {
        return res.status(500).send({
          status: 'error',
          menssage: 'Error al devolver los datoss'
        });
      }
      if (!servicios) {
        return res.status(404).send({
          status: 'error',
          menssage: 'no existe el servicio'
        });
      }
      //devolver
      return res.status(200).send({
        status: 'success',
        servicios
      });
    });
  },
  update: (req, res) => {
    //Recoger el id de la url
    var serviceId = req.params.id;
    // Los datos que llegan por put
    var params = req.body;
    //validar datos
    try {
      var validate_codigo = !validator.isEmpty(params.codigo);
      var validate_name = !validator.isEmpty(params.name);
      var validate_costo = !validator.isEmpty(params.costo);
      
    } catch (err) {
      return res.status(200).send({
        status: 'error',
        menssage: 'faltan datos por enviar!'
      });
    }

    if (validate_codigo && validate_name && validate_costo){
      //Find update
      Servicio.findOneAndUpdate({_id: serviceId}, params, {new:true}, (err, serviceUdated) => {
        if (err){
          return res.status(500).send({
            status: 'error',
            menssage: 'Error al actualizar!!'
          });
        }
        if (!serviceUdated){
          return res.status(404).send({
            status: 'error',
            menssage: 'No existe el Servicio!!'
          });
        }
        return res.status(200).send({
          status: 'success',
          service: serviceUdated
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
      menssage: 'No existe el Servicio'
    });
  },

  delete: (req, res) => {
    // Recoger el id de la url
    var serviceId = req.params.id;
    // Find and delete
    Article.findOneAndDelete({_id: serviceId}, (err, serviceRemoved) =>{
      if(err){
        return res.status(500).send({
          status: 'error',
          menssage: 'Error al borrar!!'
        });
      }
      if(!serviceRemoved){
        return res.status(404).send({
          status: 'error',
          menssage: 'No se a borrado el servicio, posiblemente no exista!!'
        });
      }
      return res.status(200).send({
        status: 'success',
        menssage: 'el Servicio fue eliminado',
        service: serviceRemoved
      });
    });

  },//borrar

  search: (req, res) => {
    var searchString = req.params.search;
    //find
    Servicio.find({ "$or":[
      {"codigo": {"$regex": searchString, "$options": "i"}},
      {"name": {"$regex": searchString, "$options": "i"}},
      {"duracion": {"$regex": searchString, "$options": "i"}}
    ]})
    .sort([['date', 'descending']])
    .exec((err, services) =>{

      if(err){
        return res.status(500).send({
          status: 'error',
          message: 'existe un error en la peticion!!',
        });
      }

      if(!services || services.length <= 0){
        return res.status(404).send({
          status: 'error',
          message: 'No existe un servicio que coincida con tu buquea',
        });
      }

      return res.status(200).send({
        status: 'success',
        services
      });
    });
  }

};

module.exports = controller;

