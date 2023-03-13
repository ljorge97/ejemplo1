var url = "http://localhost:3000/api/v1/productos";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (productos) => {

        $.each(productos, (index, val) => {
            html += "<tr>" + "<td>" + (
                index + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>" + val.fecha + "</td>" + "<td>" + val.cantidad +"<td>" + val.disponible+ "</td>" + "<td>" + "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoproductos').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'productos',
        text: "Esta seguro de eliminar al producto!",
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
                    Swal.fire('productos',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var nombre = document.getElementById('nombre').value;
    var cantidad = document.getElementById('cantidad').value;
    var fecha = document.getElementById('fecha').value;
    var disponible = document.getElementById('disponible').value;
   
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar Usuario
        var tipoEnvio = "PUT";
        var ProductoDTO = {
            _id: id,
            nombre: nombre,
            cantidad: cantidad,
            disponible: disponible,
            fecha: fecha
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo usuario
        var tipoEnvio = "POST";
        var ProductoDTO = {
            nombre: nombre,
            cantidad: cantidad,
            disponible: disponible,
            fecha: fecha
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(ProductoDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IProducto) => {
            if (IProducto) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(IProducto);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unProducto) => {

        if (unUsuario) {
            $('#_id').val(id);
            $('#nombre').val(unProducto.nombre);
            document.getElementById('producto').value = unProducto.producto;
            $('#cantidad').val(unProducto.cantidad);
            $('#fecha').val(unProducto.fecha);
            $('#disponible').val(unProducto.disponible);
            $('#idModal').html('Editar Producto')
            $('#ModalProducto').modal('show');
        } else {
            alert('error, no se encuentra al producto');
            console.log(unUsuario);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#nombre').val('');
    document.getElementById('producto').value = '';
    $('#cantidad').val('');
    $('#fecha').val('');
    $('#disponible').modal('hide');
}
