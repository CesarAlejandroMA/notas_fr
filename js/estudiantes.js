$(document).ready(function(){
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
});