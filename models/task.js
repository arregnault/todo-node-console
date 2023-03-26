const Model = require("./model");

class Task extends Model {
    description = '';
    done_at = null;

    constructor(description = '') {
        super();
        this.description = description;
    }

    fillTask({ id, description, done_at, created_at }) {
        this.id = id;
        this.description = description;
        this.done_at = done_at;
        this.created_at = new Date(created_at);
        return this;
    }

    markAsDone() {
        this.done_at = new Date();
    }

    unmarkAsDone() {
        this.done_at = null;
    }

}

module.exports = Task;