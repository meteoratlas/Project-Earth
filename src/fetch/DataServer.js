class User {
    
    constructor(key, name, email, level, commands, timestamp) {
        this.key = key;
        this.name = name;
        this.email = email;
        this.level = level;
        this.commands = commands;
        this.timestamp = timestamp;
    }

    show() {
        return `Name: ${this.name} | Email: ${this.email} | Level: ${this.level} | Commands: ${this.commands} | Timestamp: ${this.timestamp}`;
    }
}

class DataServer {
    
    constructor() {
        this.allData = [];
    }

    addData(obj) {
        this.allData.push(obj);
    }

    deleteData(key) {
        const newDataArr = this.allData.filter(eachData => eachData.key !== key);
        this.allData = newDataArr.slice();
    }

    setCountKey(newCountKey) {
        console.log(this.allData.length);
        if (this.allData.length === 0 || newCountKey === 0) {
            this.allData.push({ key: 0, countKey: newCountKey });
        } else if (this.allData.length > 0) {
            this.allData.forEach(each => {
                if (each.key === 0) {
                    each.countKey = newCountKey;
                }
            });
        } else {
            console.log('Set Count Key Error!');
            
        }
    }
};

export { User, DataServer }