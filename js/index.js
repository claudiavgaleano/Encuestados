var modelo = new Modelo();
var vistaAdmin = new VistaAdministrador(modelo, new Controlador(modelo), {
  'lista': $('#lista'),
  'botonEditarPregunta': $('#editarPregunta'),
  'botonBorrarPregunta': $('#borrarPregunta'),
  'borrarTodo': $('#borrarTodo'),
  'pregunta': $('#pregunta'),
  'respuesta': $('#respuesta'),
  'formulario': $('localStorageForm'),
  'botonAgregarPregunta': $('#agregarPregunta'),
  'muestraDeRespuestas': $('.panel-body'),
  'botonAgregarRespuesta': $('#agregarRespuesta')  
});
vistaAdmin.inicializar();
var vistaUsuario = new VistaUsuario(modelo, new Controlador(modelo), {
  'listaPreguntas': $('#preguntas'),
  'botonAgregar': $('#agregarBoton'),
  'nombreUsuario' : $('#nombreUsuario'),
  'graficosDeTorta' : $('#graficosDeTorta'),
});
vistaUsuario.inicializar();

$(document).ready(
  function(){
    var arrayPreguntas = localStorage.getItem('preguntas');
    if(arrayPreguntas != null) {
      modelo.preguntas= JSON.parse(arrayPreguntas)
      modelo.preguntaAgregada.notificar();
     // modelo.appInit.notificar();
    } else {
      localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
    }
  }
);