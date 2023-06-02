window.onload = function(){
    var nombres = localStorage.getItem("nombres");
    var apellidos = localStorage.getItem("apellidos");
    var codigoEstudiante = localStorage.getItem("codigo");

    document.getElementById('nombreText').innerText = "Nombre: " + nombres;
    document.getElementById('apellidoText').innerText = "Apellido: " + apellidos;

    let condicionGuardar = 0;
    let id = null;

    function cargarDatos(){
        $.ajax({
            method: 'get',
            url: 'http://localhost:8000/verActividad/' + codigoEstudiante,
        }).done((response)=>{
    
            const dataJson = JSON.parse(response);
            const actividades = dataJson.data;
            const table = document.getElementById('actividadesTb');
            const tbody = table.getElementsByTagName('tbody')[0];
            let html = '';
            actividades.forEach(actividad => {
                html+='<tr>'
                html+='      <td>' + actividad.id +'</td>';
                html+='      <td>'+ actividad.descripcion +'</td>';
                html+='      <td>'+ actividad.nota +'</td>';
                html+='      <td>';
                html+='          <button class="btnModificar" data-id="' + actividad.id + '" >Modificar</button>';
                html+='      </td>';
                html+='      <td>';
                html+='          <button class="btnEliminar" data-id="' + actividad.id + '" >Eliminar</button>';
                html+='      </td>';
                html+='</tr>';
            });
            tbody.innerHTML = html;
    
        }).fail((error)=>{
            console.error(error);
        });
    }
    
    cargarDatos();

    //REGISTRAR ACTIVIDAD

    $(document).on("click", "#btnRegistrarAct", function(){

        //Mostrar el formulario al hacer clic en Registrar
        var formulario = document.getElementById('inputsContainerAct');
        var inputs = formulario.getElementsByTagName('input');
        inputsContainerAct.style.display = 'block';
        inputs[0].focus;

        document.getElementById('tituloAct').innerText = 'Registrar Actividad';
        condicionGuardar = 1;
        clean();

    });

    //PROGRAMACIÓN BOTÓN GUARDAR
    
    $(document).on("click", "#btnGuardarAct", function(){

        var descripcion = document.getElementById('descripcionId');
        var nota = document.getElementById('notaId');

        if(condicionGuardar == 1){
            $.ajax({
                url: 'http://localhost:8000/crearActividad',
                method: 'post',
                data: {
                    descripcion: descripcion.value,
                    nota: nota.value,
                    codigoEstudiante: codigoEstudiante
                }
            }).done(response => {
                const dataJson = JSON.parse(response);
                const msg = dataJson.data;
                alert(msg)
                cargarDatos();
                inputsContainerAct.style.display = 'none';
            });
        }

    });

}


$(document).on("click", "#btnRegresar", function(){

    window.location.href = 'index.html';

});

function clean(){
    let vacio = "";

    document.getElementById("descripcionId").value = vacio;
    document.getElementById("notaId").value = vacio;
};

