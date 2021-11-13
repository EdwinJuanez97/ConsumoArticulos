var UrlGetArticulo =    'http://localhost:90/G5_19/controller/Articulos.php?op=GetArticulos';
var UrlPostArticulos =   'http://localhost:90/G5_19/controller/Articulos.php?op=InsertArticulos';
var UrlDeleteArticulos = 'http://localhost:90/G5_19/controller/Articulos.php?op=DeleteArticulos';
var UrlUpdateArticulos = 'http://localhost:90/G5_19/controller/Articulos.php?op=UpdateArticulos';
var UrlGetUno =          'http://localhost:90/G5_19/controller/Articulos.php?op=GetUno';


$(document).ready(function () {
    CargarArticulos();
});

function CargarArticulos() {
$.ajax({
url: UrlGetArticulo,
type: 'GET',
datatype: 'JSON',
success: function (response) {
    var MiItems = response;
    var valores = '';

    for (i = 0; i < MiItems.length; i++) {
        valores += '<tr>' +
            '<td>' + MiItems[i].ID + '</td>' +
            '<td>' + MiItems[i].DESCRIPCION + '</td>' +
            '<td>' + MiItems[i].UNIDAD + '</td>' +
            '<td>' + MiItems[i].COSTO + '</td>' +
            '<td>' + MiItems[i].PRECIO + '</td>' +
            '<td>' + MiItems[i].APLICA_ISV + '</td>' +
            '<td>' + MiItems[i].PORCENTAJE_ISV + '</td>' +
            '<td>' + MiItems[i].ESTADO + '</td>' +
            '<td>' + MiItems[i].ID_SOCIO + '</td>' +
            '<td>' +
            '<button class ="btn btn-info" onclick="CargarArticulo(' + MiItems[i].ID + ')">Editar</button>' +
            '<button class ="btn btn-danger" onclick="EliminarArticulos(' + MiItems[i].ID + ')">Eliminar</button>' +
            '</td>' +
            '</tr>';
        $('.Articulos').html(valores);
    }

}
});
}
function ActualizarArticulos(ID) {
var datosArticulo = {
ID: ID,
DESCRIPCION: $("#DESCRIPCION").val(),
UNIDAD: $("#UNIDAD").val(),
COSTO: $("#COSTO").val(),
PRECIO: $("#PRECIO").val(),
APLICA_ISV: $("#APLICA_ISV").val(),
PORCENTAJE_ISV: $("#PORCENTAJE_ISV").val(),
ESTADO: $("#ESTADO").val(),
ID_SOCIO: $("#ID_SOCIO").val(),

};
var datosArticulojson = JSON.stringify(datosArticulo);

$.ajax({
url: UrlUpdateArticulos,
type: 'PUT',
data: datosArticulojson,
datatype: 'JSON',
contentType: 'application/json',
success: function (response) {
    console.log(response);
}
});
alert("Articulo Actualizado");
}
function CargarArticulo(ID) {
var datosArticulo = {
ID: ID
};
var datosArticulojson = JSON.stringify(datosArticulo);

$.ajax({
url: UrlGetUno,
type: 'POST',
data: datosArticulojson,
datatype: 'JSON',
contentType: 'application/json',
success: function (response) {
    var MiItems = response;
    $('#ID').val(MiItems[0].ID);
    $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
    $('#UNIDAD').val(MiItems[0].UNIDAD);
    $('#COSTO').val(MiItems[0].COSTO);
    $('#PRECIO').val(MiItems[0].PRECIO);
    $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
    $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
    $('#ESTADO').val(MiItems[0].ESTADO);
    $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
    var btn_Actualizar = '<input type="submit" id="btn_Actualizar" onclick="ActualizarArticulos(' + MiItems[0].ID + ')"' +
        'value="Actualizar Articulos" class="btn btn-primary"></input>';
    $('.button').html(btn_Actualizar);
}
});
}

function EliminarArticulos(ID) {
    var datosArticulo = {
        ID: ID
    };
    var datosArticulojson = JSON.stringify(datosArticulo);

    $.ajax({
        url: UrlDeleteArticulos,
        type: 'DELETE',
        data: datosArticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Articulo Borrado");
}