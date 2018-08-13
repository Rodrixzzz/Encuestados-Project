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
    this.preguntasActualizadas.notificar();
  },
  borrarPregunta: function(idABorrar){
    this.preguntas = this.preguntas.filter(function(item){
      return item.id != idABorrar;
     });
    this.preguntasActualizadas.notificar();
  },
  // editarPregunta: function(Nuevonombre, Nuevarespuestas,idAModificar){
  //   var indexAModificar = this.preguntas.indexOf('id:'+idAModificar);
  //   this.preguntas[indexAModificar] = {'textoPregunta': Nuevonombre, 'id': idAModificar, 'cantidadPorRespuesta': Nuevarespuestas}
  //   this.preguntasActualizadas.notificar();
  // },
  borrarTodo: function(){
    this.preguntas = [];
    this.preguntasActualizadas.notificar();
  },
  // agregarVoto: function(){

  // },
  //se guardan las preguntas
  guardar: function(){
    localStorage.removeItem('array');
    localStorage.setItem('array',JSON.stringify(this.preguntas));
    this.ultimoId++;
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
