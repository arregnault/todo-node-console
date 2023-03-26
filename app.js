require('colors');

const { saveData, getData } = require('./helpers/files');
// const { pause, showMenu } = require('./helpers/messages')
const { pause, readInput, showMenu, showTaskMenu, confirm, showTaskCheckMenu } = require('./helpers/inquirer');
const TaskList = require('./models/task-list');

const main = async () => {
    let option;
    const data = getData();
    const taskList = new TaskList;

    if (data) {
        taskList.fillTaskList(JSON.parse(data));
    }

    do {

        option = (await showMenu()).option;

        switch (option) {
            case '1':
                const description = await readInput(`¿Cuáles son los detalles de la tarea?`);
                taskList.addTask(description);
                break;
            case '2':
                taskList.printCollection();
                break;
            case '3':
                taskList.printDoneTaskList();
                break;
            case '4':
                taskList.printPendingTaskList();
                break;
            case '5':
                const doneTaskIds = await showTaskCheckMenu(taskList.taskArray, `Seleccione las tareas terminadas`);
                if (doneTaskIds.length > 0) {
                    const confirmDone = await confirm(`¿Está seguro de que desea marcar como terminadas estas tareas?`);
                    if (confirmDone) {
                        taskList.toggleDoneTasks(doneTaskIds);
                    }
                }
                break;
            case '6':
                const updateTaskId = await showTaskMenu(taskList.taskArray, `¿Qué deseas modificar?`);
                if (updateTaskId !== '0') {
                    const updateDescription = await readInput(`¿Cuáles son los nuevos detalles de la tarea?`);
                    const confirmUpdate = await confirm(`¿Está seguro de que desea modificar esta tarea?`);
                    if (confirmUpdate) taskList.updateTask(updateTaskId, updateDescription);
                }
                break;
            case '7':
                const deleteTaskId = await showTaskMenu(taskList.taskArray, `¿Qué tarea deseas borrar?`);
                if (deleteTaskId !== '0') {
                    const confirmDelete = await confirm(`¿Está seguro de que desea eliminar esta tarea?`);
                    if (confirmDelete) taskList.deleteTask(deleteTaskId);
                }
                break;

            default:
                break;
        }

        saveData(JSON.stringify(taskList._list));

        await pause();

        console.clear();

    } while (option !== '0');

}


console.clear();

main();