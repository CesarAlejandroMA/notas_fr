$(document).ready(function(){

    function cargarDatos(){
        $.ajax({
            method: 'get',
            url: 'http://localhost:8000/estudiantes'
        }).done((response)=>{
    
            const dataJson = JSON.parse(response);
            const estudiantes = dataJson.data;
            const table = document.getElementById('estudiantesTb');
            const tbody = table.getElementsByTagName('tbody')[0];
            let html = '';
            estudiantes.forEach(estudiante => {
                html+='<tr>'
                html+='      <td>' + estudiante.codigo+'</td>';
                html+='      <td>'+ estudiante.nombres+'</td>';
                html+='      <td>'+ estudiante.apellidos+'</td>';
                html+='      <td>';
                html+='          <button class="btnModificar">Modificar</button>';
                html+='      </td>';
                html+='      <td>';
                html+='          <button class="btnEliminar">Eliminar</button>';
                html+='      </td>';
                html+='      <td>';
                html+='          <button class="btnNotas">Notas</button>';
                html+='      </td>';
                html+='</tr>';
            });
            tbody.innerHTML = html;
    
        }).fail((error)=>{
            console.error(error);
        });
    }

    cargarDatos();

    let condicionGuardar = 0;

    //REGISTRAR ESTUDIANTES

    $(document).on("click", "#btnRegistrar", function(){

        document.getElementById('titulo').innerText = 'Registrar Estudiante';
        condicionGuardar = 1;
        clean();

    });

    //PROGRAMACIÓN DEL BOTÓN GUARDAR

    document.getElementById('btnGuardar').addEventListener('click', guardar);

    function guardar(){
        
        let codigo = document.getElementById('codigoId');
        let nombre = document.getElementById('nombresId');
        let apellido = document.getElementById('apellidosId');

        if(condicionGuardar == 1){
            $.ajax({
                url: 'http://localhost:8000/estudiantes',
                method: 'post',
                data: {
                    codigo: codigo.value,
                    nombres: nombre.value,
                    apellidos: apellido.value
                }
            }).done(response => {
                const dataJson = JSON.parse(response);
                const msg = dataJson.data;
                alert(msg)
                cargarDatos();
            });
        }

    }

    //LIMPIAR LOS INPUT
    function clean(){
        let codigo = "";
        let nombres= "";
        let apellidos = "";

        document.getElementById("codigoId").value = codigo;
        document.getElementById("nombresId").value = nombres;
        document.getElementById("apellidosId").value = apellidos;

    };

});