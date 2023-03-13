var url = "http://localhost:3000/api/v1/proveedor";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (productos) => {

        $.each(productos, (index, val) => {
            html += "<tr>" + "<td>" + (
                index + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>" + val.telefono+ "</td>" + "<td>" + val.email +"<td>" + val.direccion+ "</td>" + "<td>" + "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoveedor').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'proveedor',
        text: "Esta seguro de eliminar al proveedor!",
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
                    Swal.fire('proveedor',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    var direccion = document.getElementById('direccion').value;
   
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar Usuario
        var tipoEnvio = "PUT";
        var ProveedorDTO = {
            _id: id,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo usuario
        var tipoEnvio = "POST";
        var ProveedorDTO = {
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(ProveedorDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IProveedor) => {
            if (IProveedor) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(IProveedor);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unProveedor) => {

        if (unUsuario) {
            $('#_id').val(id);
            $('#nombre').val(unProveedor.nombre);
            document.getElementById('proveedor').value = unProveedor.proveedor;
            $('#telefono').val(unProveedor.telefono);
            $('#email').val(unProveedor.email);
            $('#direccion').val(unProveedor.direccion);
            $('#idModal').html('Editar Proveedor')
            $('#ModalProveedor').modal('show');
        } else {
            alert('error, no se encuentra al proveedor');
            console.log(unUsuario);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#nombre').val('');
    document.getElementById('proveedor').value = '';
    $('#email').val('');
    $('#telefono').val('');
    $('#direccion').val('');
    $('#ModalUsuarios').modal('hide');
}

