// Validacion del Forumalario de Registro

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById('registro');
    const error = document.getElementById('error');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        let nombre = document.getElementById('name').value;
        let apellido = document.getElementById('surname').value;
        let usuario = document.getElementById('user').value;
        let clave = document.getElementById('password').value;
        let correo = document.getElementById('mail').value;
        // let cumple = document.getElementById('birth').value;
        let terminos = document.getElementById('terminos').checked;

        if (nombre.trim() === '') {
            alert('Escriba su nombre') ;
            return 
        }
        if (apellido.trim() === '') {
            alert('Escriba su apellido');
            return
        }
        if (usuario.trim() === '') {
            alert('Escriba un usuario');
            return
        }
        if (clave.trim() === '') {
            alert('Escriba una contraseña');
            return 
        }
        if (!validarCorreo(correo)) {
            alert('Correo incompleto o invalido');
            return 
        }
        if (!terminos) {
            alert('Debes aceptar los terminos y condiciones');
            return
        }
        alert('Registro exitoso');
        formulario.submit();
    });
    function validarCorreo(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});


