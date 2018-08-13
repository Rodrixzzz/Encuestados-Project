/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function() {
    var value = $('#pregunta').val();
    var respuestas = [];
    $('[name="option[]"]').each(function(){
      var respuesta = $(this).val();
      //Completar el agregado de una respuesta
      // pusheandola al arreglo de respuestas
      if(respuesta !== '')
      {
        respuestas.push({'textoRespuesta': respuesta, cantidad: 0});
      }
    })
    this.modelo.agregarPregunta(value, respuestas);
  },

  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombrePregunta = $(this).attr('name')
      var id = $(this).attr('id')
      var pregunta = contexto.modelo.obtenerPregunta(id);
      var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
      $('input[name=' + id + ']').prop('checked',false);
      console.log(respuestaSeleccionada);
      if(respuestaSeleccionada !== undefined)
      {
        contexto.modelo.agregarVoto(pregunta,respuestaSeleccionada);
      }
      else
      {
        alert('Seleccione una opcion');
      }
    });
  },

  borrarPregunta: function(){
    var preguntaABorrar = $('#lista').find('li.active').attr('id');
    console.log(preguntaABorrar);
    if(preguntaABorrar !== undefined)
    {
      this.modelo.borrarPregunta(preguntaABorrar);
    }
    else
    {
      alert('Seleccione un elemento');
    }
  },
  borrarTodo:function(){
    this.modelo.borrarTodo();
  },
  editarPregunta:function(){
    var preguntaAEditar = $('#lista').find('li.active').attr('id');
    if(preguntaAEditar !== undefined)
    {
      var texto = prompt('Ingrese el texto a editar');
      if(texto !== ' ' && texto !== undefined){
        this.modelo.editarPregunta(preguntaAEditar,texto);
      } 
      else{
        alert('Ingrese un texto valido');
      }
    }
    else
    {
      alert('Seleccione un elemento');
    }
  }
};
