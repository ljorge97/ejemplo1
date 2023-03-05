var url = "http://localhost:3000/api/v1/vuelos";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (vuelos) => {

        $.each(vuelos, (index, val) => {
            html += "<tr>" + "<td>" + (
                index + 1
            ) + "</td>" + "<td>" + val.piloto + "</td>" + "<td>" + val.avion + "</td>" + "<td>" + val.destino + "</td>" + "<td>" + val.fecha +"</td>"+ "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoVuelos').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'vuelos',
        text: "Esta seguro de eliminar el vuelo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + '/' + id,
                type: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                success:(mensaje)=>{
                   cargatabla();
                   limpiaCajas();
                    Swal.fire('Usuarios',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var piloto = document.getElementById('piloto').value;
    var avion = document.getElementById('avion').value;
    var destino = document.getElementById('avion').value;
   
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar Vuelo
        var tipoEnvio = "PUT";
        var VueloDTO = {
            _id: id,
            piloto: piloto,
            avion: avion,
            destino: destino
           
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo vuelo
        var tipoEnvio = "POST";
        var VueloDTO = {
            piloto: piloto,
            avion: avion,
            destino: destino
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(VueloDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IVuelo) => {
            if (IVuelo) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(IVuelo);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unVuelo) => {

        if (unVuelo) {
            $('#_id').val(id);
            $('#piloto').val(unVuelo.piloto);
            document.getElementById('vuelo').value = unVuelo.vuelo;
            
            $('#idModal').html('Editar Vuelo')
            $('#ModalVuelos').modal('show');
        } else {
            alert('error, no se encuentra el vuelo');
            console.log(unVuelo);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#piloto').val('');
    document.getElementById('vuelo').value = '';
    $('#avion').val('');
    $('#destino').val('');
    $('#ModalVuelos').modal('hide');
}
