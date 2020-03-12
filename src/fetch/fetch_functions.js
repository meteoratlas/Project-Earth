const url = 'http://localhost:5000/';

const fetch_functions = {
    async getAllData() {
        return await postData(url + 'all');
    }, 
    async getData(key) {
        return await postData(url + 'read', { key: key });
    },

    async clearData() {
        return await postData(url + 'clear');
    },

    async addData(obj) {
        return await postData(url + 'add', obj);
    },

    async deleteData(obj) {
        return await postData(url + 'delete', obj);
    },

    async updateData(obj) {
        return await postData(url + 'update', obj);
    },

    async updateCountKey(obj, newCountKey) {
        return await postData(url + 'update', { key: 0, countKey: newCountKey, authEmail: obj.authEmail });
    },

    async resetCountKey() {
        return await postData(url + 'add', { key: 0, countKey: 0, authEmail: [] });
    },

    async resetUsers() {
        // await postData(url + 'add', { key: 0, countKey: 0, authEmail: [] });
        return await postData(url + 'add', { key: 1, users: [] });
    },

    async addAuthUser(obj, emailArr) {
        obj.authEmail = [];
        emailArr.forEach(email => obj.authEmail.push(email));
        // obj.authEmail.push(newEmail);
        return await postData(url + 'update', { key: 0, countKey: obj.countKey, authEmail: obj.authEmail});
    },

    async addNewUser(currentobj, obj) {
        let newUser = { email: obj.email, firstName: obj.firstName, lastName: obj.lastName, password: obj.password }
        currentobj.users.push(newUser)
        // console.log(currentobj)
        return await postData(url + 'update', { key: 1, users: currentobj.users});
        //obj.email, firstname: obj.firstName, lastname: obj.firstName, password: obj.password 
    },


}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',     // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',       // no-cors, *cors, same-origin
        cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',         // manual, *follow, error
        referrer: 'no-referrer',    // no-referrer, *client
        body: JSON.stringify(data)  // body data type must match "Content-Type" header
    });

    const json = await response.json();    // parses JSON response into native JavaScript objects
    json.status = response.status;
    json.statusText = response.statusText;
    // console.log(json, typeof(json));
    return json;
}

export default fetch_functions
