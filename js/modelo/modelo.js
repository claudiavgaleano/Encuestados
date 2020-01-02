/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.listaDePreguntasEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.respuestaAgregada = new Evento(this);
  this.respuestaVotada = new Evento(this);   
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {    
    let idMayor = this.ultimoId;
    this.preguntas.forEach(function(pregunta) {
      if (pregunta.id > idMayor) {
        idMayor = pregunta.id;
      }
    });
    return idMayor;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};    
    this.preguntas.push(nuevaPregunta);
    this.guardar();    
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function(id){  
    var preguntaPorBorrar = this.preguntas.find(pregunta => pregunta.id == id);    
    this.preguntas.splice(this.preguntas.indexOf(preguntaPorBorrar),1);
    this.guardar();        
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function(id, texto){
    var preguntaPorEditar = this.preguntas.find(pregunta => pregunta.id == id);
    preguntaPorEditar.textoPregunta = texto;
    this.guardar();     
    this.preguntaEditada.notificar();
 },

  borrarTodo: function(){    
    this.preguntas =[];
    this.guardar();    
    this.listaDePreguntasEliminada.notificar();
  },

  agregarRespuesta: function(id, nuevaRespuesta){  
    var preguntaSeleccionada = this.preguntas.find(pregunta => pregunta.id == id);  
    preguntaSeleccionada.cantidadPorRespuesta.push(nuevaRespuesta);
    this.guardar();   
    this.respuestaAgregada.notificar();
  },
  sumarVoto: function(nombrePregunta,respuestaSeleccionada){   
    var preguntaElegida = this.preguntas.find(pregunta => pregunta.textoPregunta == nombrePregunta); 
    var respuestaElegida = preguntaElegida.cantidadPorRespuesta.find( respuesta => respuesta.textoRespuesta == respuestaSeleccionada);
    respuestaElegida.cantidad++;
    this.guardar();
    this.respuestaVotada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));    
  },
  
};
