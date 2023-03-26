require('colors');

const Task = require("./task");

class TaskList {
    _list = {}

    constructor() {
        this._list = {};
    }

    fillTaskList(list = {}) {
        if (list) {
            const keys = Object.keys(list)
            keys.forEach(taskId => {
                let task = (new Task()).fillTask(list[taskId]);
                this._list[taskId] = task;
            });
        }
    }

    get taskArray() {
        let list = [];
        const keys = Object.keys(this._list)
        keys.forEach(taskId => {
            let task = this._list[taskId];
            list.push(task);
        });
        return list;
    }

    get doneTaskList() {
        let list = [];
        const keys = Object.keys(this._list)
        keys.forEach(taskId => {
            let task = this._list[taskId];
            if (task.done_at) list.push(task)
        });
        return list;
    }

    get pendingTaskList() {
        let list = [];
        const keys = Object.keys(this._list)
        keys.forEach(taskId => {
            let task = this._list[taskId];
            if (!task.done_at) list.push(task)
        });
        return list;
    }

    addTask(description) {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    printCollection() {
        this.printList(this.taskArray)
    }

    printDoneTaskList() {
        this.printList(this.doneTaskList)
    }

    printPendingTaskList() {
        this.printList(this.pendingTaskList)
    }

    printList(list) {
        list.forEach((task, i) => {
            const status = task.done_at ? `Completada el ${task.done_at}`.green : 'Pendiente'.red;
            const index = `${i + 1}`.magenta;
            console.log(`\n${index} :: ${task.description.blue} :: ${status} :: ` + `Creada el ${task.created_at}`.yellow)
        });
    }

    toggleDoneTasks(doneTaskIds = []) {
        doneTaskIds.forEach(taskId => {
            if (!this._list[taskId].done_at) {
                this._list[taskId].markAsDone();
            }
        });

        this.doneTaskList.forEach(task => {
            if (!doneTaskIds.includes(task.id)) task.unmarkAsDone();
        });
    }

    updateTask(taskId = '', description = '') {
        if (this._list[taskId]) {
            this._list[taskId].description = description;
        }
    }

    deleteTask(taskId = '') {
        if (this._list[taskId]) {
            delete this._list[taskId];
        }
    }

}

module.exports = TaskList;