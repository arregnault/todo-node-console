require('colors');

const pause = () => {

    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question(`\nPresione ${'ENTER'.red} para continuar.\n`, (option) => {
            readLine.close();
            resolve();
        });
    });
}

const showMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log(`\n---------------------------------------`.bgGreen);
        console.log(`      << Seleccione una opción >>      `.blue);
        console.log(`---------------------------------------\n`.bgGreen);

        const options = [
            'Salir',
            'Crear tarea',
            'Listar tareas',
            'Listar tareas completadas',
            'Listar tareas pendientes',
            'Completar tarea(s)',
            'Borrar tarea(s)\n',
        ]

        options.forEach((option, key) => {
            console.log(`[${key}]`.cyan.bold, option);
        });

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question(`¿Cuál es su opción? `, (option) => {
            readLine.close();
            resolve(option)
        });

    });
};


module.exports = {
    pause,
    showMenu,
}