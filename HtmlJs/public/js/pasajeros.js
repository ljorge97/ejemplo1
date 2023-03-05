var url = "http://localhost:3000/api/v1/pasageros";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (pasajeros) => {

        $.each(pasajeros, (index, val) => {
            html += "<tr>" + "<td>" + (
                index + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>"  +"</td>"+ "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoPasajeros').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'pasajeros',
        text: "Esta seguro de eliminar el pasajero",
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
    var nombre = document.getElementById('nombre').value;
    var email = $('#email').val();
   
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar pasajero
        var tipoEnvio = "PUT";
        var PasajeroDTO = {
            _id: id,
            nombre: nombre,
            email: email
           
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo pasajero
        var tipoEnvio = "POST";
        var PasajeroDTO = {
            nombre: nombre,
            email:email
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(PasajeroDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (Ipasajero) => {
            if (Ipasajero) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(Ipasajero);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unPasajero) => {

        if (unPasajero) {
            $('#_id').val(id);
            $('#nombre').val(unPasajero.nombre);
            document.getElementById('pasajero').value = unPasajero.pasajero;
            
            $('#idModal').html('Editar pasajero')
            $('#ModalPasajeros').modal('show');
        } else {
            alert('error, no se encuentra el pasajero');
            console.log(unPasajero);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#nombre').val('');
    document.getElementById('pasajero').value = '';
    $('#email').val('');
    $('#ModalPasajeros').modal('hide');
}
