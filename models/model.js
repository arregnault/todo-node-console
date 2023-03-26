const { v4: uuidV4 } = require('uuid');

class Model {
    id = '';
    created_at = null;

    constructor() {
        this.id = uuidV4();
        this.created_at = Date();
    }

}

module.exports = Model;