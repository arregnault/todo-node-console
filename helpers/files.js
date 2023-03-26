const fs = require('fs');

const db = 'data.json';
const dbPath = `./database/${db}`;

const getData = () => {
    if (!fs.existsSync(dbPath)) {
        return null;
    }
    const data = fs.readFileSync(dbPath, { encoding: 'utf-8' });
    return data;
}
const saveData = (data) => {
    fs.writeFileSync(dbPath, data);
}

module.exports = {
    getData,
    saveData
}