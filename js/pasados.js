// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
var proximos = [];
var pasados = [];
var hoy;
var eventos;

$(document).ready(function () {

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "info.json"
  }).done(function (resultado) {
  
  //Guarda el resultado en variables
  hoy = resultado.fechaActual;
  eventos = resultado.eventos;
  
  //Selecciona los eventos que sean posteriores a la fecha actual del JSON
  for(var i = 0; i < eventos.length; i++){
    if (eventos[i].fecha > hoy) {
      proximos.push(eventos[i]);
    }
    else{
      pasados.push(eventos[i]);
    }
  }

  //Ordena los eventos segun la fecha (los mas cercanos primero)
  pasados = pasados.sort(function (uno, dos) {
    if (uno.fecha < dos.fecha) {
      return 1;
    }
    return -1;
  });

  //Crea un string que contenga el HTML que describe el detalle del evento
  var html = ""

  //Recorre el arreglo y concatena el HTML para cada evento
  for (var h = 0; h < pasados.length; h++) {
    html += `<div class="col-md-12">
                <div class="card flex-md-row mb-4  h-md-250">
                  <div class="card-body d-flex flex-column align-items-start">
                    <h3 class="mb-0">
                      <a href="detalle.html?id=${pasados[h].id}">${pasados[h].nombre}</a>
                    </h3>
                    <div class="mb-1 text-muted">${pasados[h].fecha} | ${pasados[h].lugar} </div>
                    <p class="card-text mb-auto">${pasados[h].descripcion}
                    </p>
                    <p class="card-text mb-auto invitados">Cantidad de invitados: ${pasados[h].invitados}
                    </p>
                  </div>
                </div>
              </div>`
  }

  //Modifica el DOM agregando el html generado dentro del div con id=evento
  document.getElementById("pasados").innerHTML = html;
  });
});