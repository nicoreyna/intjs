// Hemos omitido los acentos en los comentarios por compatibilidad
var eventos = [];

$(document).ready(function () {

  //Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
  var id = 123;

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "info.json"
  }).done(function (resultado) {
    
  //Guarda el resultado en una variable
  var eventos = resultado.eventos;
    
  //Busca el elemento en el arreglo
  var id = location.search.match(/id=(\d)*/)[1]
  
  //filtra todos los eventos y retorna solo el que coincida con el id de la url
  evento = eventos.find(function (element) {
    return element.id == id
  });

  //Crea un string que contenga el HTML que describe el detalle del evento
  var html = ""

  //Modifica el DOM agregando el html generado dentro del div con id=evento
  html = `<div class="col-md-12">
            <div class="card flex-md-row mb-4  h-md-250">
              <div class="card-body d-flex flex-column align-items-start">
                <h3 class="mb-0">
                  <a href="detalle.html?id=${evento.id}">${evento.nombre}</a>
                </h3>
                <div class="mb-1 text-muted">${evento.fecha} | ${evento.lugar} </div>
                <p class="card-text mb-auto">${evento.descripcion}
                </p>
                <p class="card-text mb-auto precio">Costo: ${evento.precio}
                <p class="card-text mb-auto invitados">Cantidad de invitados: ${evento.invitados}
                </p>
              </div>
            </div>
          </div>`
    
  document.getElementById("evento").innerHTML = html;
  });
});
