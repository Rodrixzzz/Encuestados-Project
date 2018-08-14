/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntasActualizadas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    return this.ultimoId;
  },
  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
  },
  borrarPregunta: function(idABorrar){
    this.preguntas = this.preguntas.filter(function(item){
      return item.id != idABorrar;
     });
    this.guardar();
  },
  editarPregunta: function(idAModificar,Nuevonombre){
    var preguntaAModificar = this.obtenerPregunta(idAModificar);
    preguntaAModificar.textoPregunta = Nuevonombre;
    this.guardar();
  },
  borrarTodo: function(){
    this.preguntas = [];
    this.guardar();
  },
  agregarVoto: function(pregunta,respuestaSeleccionada){
    this.preguntas.forEach(element => {
      if(element.id === pregunta.id)
      {
        for (var index = 0; index < element.cantidadPorRespuesta.length; index++){
          if(element.cantidadPorRespuesta[index].textoRespuesta === respuestaSeleccionada ){
            element.cantidadPorRespuesta[index].cantidad++;
          }
        }
      }
    });
    this.guardar();
  },
  obtenerPregunta:function(idABuscar){
    for (var index = 0; index < this.preguntas.length; index++) {
      if(this.preguntas[index].id === idABuscar)
      {
        return this.preguntas[index];
      }
    }
  },
  //se guardan las preguntas
  guardar: function(){
    localStorage.removeItem('array');
    localStorage.setItem('array',JSON.stringify(this.preguntas));
    this.ultimoId++;
    this.preguntasActualizadas.notificar();

  },
  recuperarDatos:function(){
    var datos = localStorage.getItem('array');
    if(datos !== null)
    {
      datos = JSON.parse(datos);
      this.preguntas = datos;
      this.ultimoId = this.preguntas[this.preguntas.length - 1].id;
      this.preguntasActualizadas.notificar();
    }
  }
};
