/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){    
    this.modelo.borrarPregunta(id);
  },
  borrarTodo: function() {
    this.modelo.borrarTodo();
  },
  editarPregunta: function(id){    
    if (isNaN(id)){
      alert("Seleccione una pregunta");
    } else {
      if (texto != "") {
        var texto = prompt("Modifique la pregunta");
        this.modelo.editarPregunta(id, texto);
      } else {
        alert("inserte un texto válido");      
      }
    }        
  },
  agregarRespuesta: function(id){    
    if (isNaN(id)){
      alert("Seleccione una pregunta");
    } else {  
        var nuevaRespuesta = {'textoRespuesta': prompt("inserte una respuesta"), 'cantidad': 0};    
        if (nuevaRespuesta.textoRespuesta !== "") {          
          this.modelo.agregarRespuesta(id, nuevaRespuesta);
        } else {
          alert("inserte un texto válido");      
        } 
    }       
  },  

  agregarVotos: function(nombrePregunta, respuestaSeleccionada) {    
    if(respuestaSeleccionada == undefined) {
      alert('Debe votar en todas las preguntas');      
    } else {
      this.modelo.sumarVoto(nombrePregunta, respuestaSeleccionada);
    }
  }
};
