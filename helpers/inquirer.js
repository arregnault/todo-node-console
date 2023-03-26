require('colors');
const inquirer = import('inquirer');

const options = [
    { value: `1`, name: `${'['.blue}${'1'.magenta}${']'.blue} Crear tarea` },
    { value: `2`, name: `${'['.blue}${'2'.magenta}${']'.blue} Listar tareas` },
    { value: `3`, name: `${'['.blue}${'3'.magenta}${']'.blue} Listar tareas completadas` },
    { value: `4`, name: `${'['.blue}${'4'.magenta}${']'.blue} Listar tareas pendientes` },
    { value: `5`, name: `${'['.blue}${'5'.magenta}${']'.blue} Completar tarea(s)` },
    { value: `6`, name: `${'['.blue}${'6'.magenta}${']'.blue} Modificar tarea(s)` },
    { value: `7`, name: `${'['.blue}${'7'.magenta}${']'.blue} Borrar tarea(s)` },
    { value: `0`, name: `${'['.blue}${'0'.magenta}${']'.blue} Salir` },
]

const questions = {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: options
}

const pause = async () => {

    const prompt = (await inquirer).createPromptModule();

    const confirm = prompt({
        type: 'input',
        name: 'continue',
        message: `\nPresione ${'ENTER'.red} para continuar.\n`,
    })

    return confirm;
}

const readInput = async (message) => {

    const prompt = (await inquirer).createPromptModule();

    const { input } = await prompt({
        type: 'input',
        name: 'input',
        message,
        validate: (value) => {
            if (value.length === 0) return "Debe ingresar un texto válido."
            return true;
        }
    })

    return input;
}

const confirm = async (message) => {

    const prompt = (await inquirer).createPromptModule();

    const { input } = await prompt({
        type: 'confirm',
        name: 'input',
        message,
        validate: (value) => {
            if (value.length === 0) return "Debe ingresar un texto válido."
            return true;
        }
    })

    return input;
}

const showMenu = async () => {

    console.log(`---------------------------------------`.bgGreen);
    console.log(`      << Seleccione una opción >>      `.blue);
    console.log(`---------------------------------------`.bgGreen);

    const prompt = (await inquirer).createPromptModule();
    const option = await prompt(questions)

    return option;
};


const showTaskMenu = async (tasks = [], message = '') => {

    tasks = tasks.map((task, i) => {
        const index = `${i + 1}`.yellow;
        return {
            value: task.id,
            name: `[${index}] ${task.description.blue}`
        }
    });
    tasks.unshift({
        value: '0',
        name: `[${'0'.yellow}] Cancelar`

    })
    const prompt = (await inquirer).createPromptModule();
    const { option } = await prompt({
        type: 'list',
        name: 'option',
        message,
        choices: tasks
    })

    return option;
};

const showTaskCheckMenu = async (tasks = [], message = '') => {

    tasks = tasks.map((task, i) => {
        const index = `${i + 1}`.yellow;
        return {
            value: task.id,
            name: `[${index}] ${task.description.blue}`,
            checked: task.done_at ? true : false,
        }
    });

    const prompt = (await inquirer).createPromptModule();
    const { ids } = await prompt({
        type: 'checkbox',
        name: 'ids',
        message,
        choices: tasks
    })

    return ids;
};

module.exports = {
    confirm,
    pause,
    readInput,
    showMenu,
    showTaskMenu,
    showTaskCheckMenu,
};