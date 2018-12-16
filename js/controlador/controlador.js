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
      if(respuesta != '')
      {
        respuestas.push({'textoRespuesta': respuesta, cantidad: 0});
      }
    })
    if(respuestas.length > 0 && value != '')
      this.modelo.agregarPregunta(value, respuestas);
    else
      alert("Debe completar los campos");
  },

  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombreUsuario = $('#nombreUsuario').val();
      var id = $(this).attr('id')
      id = parseInt(id);
      var pregunta = contexto.modelo.obtenerPregunta(id);
      var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
      $('input[name=' + id + ']').prop('checked',false);
      if(contexto.validarDatos(respuestaSeleccionada,null) && contexto.validarDatos(nombreUsuario,'Input') )
      {
        contexto.modelo.agregarVoto(pregunta,respuestaSeleccionada);
      }
    });
  },

  borrarPregunta: function(){
    var preguntaABorrar = $('#lista').find('li.active').attr('id');
    if(this.validarDatos(preguntaABorrar,null))
    {
      this.modelo.borrarPregunta(preguntaABorrar);
    }
  },
  borrarTodo:function(){
    this.modelo.borrarTodo();
  },
  editarPregunta:function(){
    var preguntaAEditar = $('#lista').find('li.active').attr('id');
    preguntaAEditar = parseInt(preguntaAEditar);
    if(this.validarDatos(preguntaAEditar,null))
    {
      var texto = prompt('Ingrese el texto a editar');
      if(this.validarDatos(texto,'Input')){
        this.modelo.editarPregunta(preguntaAEditar,texto);
      } 
    }
  },
  validarDatos: function(valor,opcion){
    if (valor !== undefined && valor!== ' '){
      return true;
    }
    else{
      if(opcion === 'Input'){
        alert('Ingrese un texto valido');
      }
      else{
        alert('Seleccione un elemento');
      }
    }
  }
};
