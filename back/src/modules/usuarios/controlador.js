const TABLA = 'usuarios';
const bcrypt = require('bcrypt');
const autenticacion = require('../../autenticacion')

module.exports = function (dbInyectada) {
    let db = dbInyectada;

    if (!db) {
        db = require('../../db/mysql')
    }

    async function login(usuario, password) {
        const data = await db.query(TABLA, {correo: usuario});

        return bcrypt.compare(password, data.password)
            .then(resultado => {
                if (resultado === true) {
                    return auth.asignarToken(data);
                } else {
                    throw new Error("Información Invalida");
                }
            })
    }
    async function agregar(data) {
        if (data.username) {
            authData.username = data.username
        }
        if(data.password) {
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        return db.agregar(TABLA, authData);
    }
    

    function todos() {
        return db.todos(TABLA);
    }
    
    function uno(id) {
        return db.uno(TABLA, id);
    }
    
    async function agregar(body) {
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            apellido: body.apellido,
            correo: body.correo,
            telefono: body.telefono,
            password: body.pass
        }
        const respuesta = await db.agregar(TABLA, usuario);
        var insertId = 0;
        if (body.id == 0) {
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }
        var respuesta2 = '';
        if (body.usuario || body.password) {
            respuesta2 = await auth.agregar({
                id: insertId,
                username: body.username,
                password: body.password
            })
        } 
        return respuesta2;
    }
    
    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        eliminar
    }
}