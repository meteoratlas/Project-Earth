global.fetch = require('node-fetch');
import { User, DataServer } from './DataServer'
import fetch_functions from './fetch_functions.js'

// ---- User Class ----
test('test that User class works?', () => {
    // Create 2 users in User Class
    const newUser1 = new User(1, 'Chris Roberts', 'chris.roberts@gmail.com', 3, [{ command: "idArrowRight", amount: 1 }, { command: "idArrowUp", amount: 1 }], '03/03/2020, 01:01:32 PM');
    const newUser2 = new User(2, 'Justin Cook', 'justin.cook@gmail.com', 1, [{ command: "idArrowLeft", amount: 4 }, { command: "idArrowUp", amount: 2 }], '07/01/2020, 01:09:26 AM');

    // Testing show() on each user
    expect(newUser1.show()).toEqual("Name: Chris Roberts | Email: chris.roberts@gmail.com | Level: 3 | Commands: [object Object],[object Object] | Timestamp: 03/03/2020, 01:01:32 PM");
    expect(newUser2.show()).toEqual("Name: Justin Cook | Email: justin.cook@gmail.com | Level: 1 | Commands: [object Object],[object Object] | Timestamp: 07/01/2020, 01:09:26 AM");
});

// ---- DataServer Class ----
test('test that DataServer class works?', () => {

    const dataServer = new DataServer();
    const user1 = new User(1, 'Chris Roberts', 'chris.roberts@gmail.com', 3, [{ command: "idArrowRight", amount: 1 }, { command: "idArrowUp", amount: 1 }], '03/03/2020, 01:01:32 PM');
    const user2 = new User(2, 'Justin Cook', 'justin.cook@gmail.com', 1, [{ command: "idArrowLeft", amount: 4 }, { command: "idArrowUp", amount: 2 }], '07/01/2020, 01:09:26 AM');

    // Add 2 users
    dataServer.addData(user1);
    dataServer.addData(user2);
    
    expect(dataServer.allData.length).toEqual(2);

    // Delete user1
    dataServer.deleteData(1);

    // Should have only user2 in dataServer
    expect(dataServer.allData.length).toEqual(1);
    expect(dataServer.allData[0].name).toEqual("Justin Cook");

    expect(dataServer.allData[0].commands).toEqual([{ "amount": 4, "command": "idArrowLeft" }, { "amount": 2, "command": "idArrowUp" }])

});

test('test that the fetch works?', async () => {

    const user1 = new User(1, 'Chris Roberts', 'chris.roberts@gmail.com', 3, [{ command: "idArrowRight", amount: 1 }, { command: "idArrowUp", amount: 1 }], '03/03/2020, 01:01:32 PM');
    const user2 = new User(2, 'Justin Cook', 'justin.cook@gmail.com', 1, [{ command: "idArrowLeft", amount: 4 }, { command: "idArrowUp", amount: 2 }], '07/01/2020, 01:09:26 AM');

    let data = await fetch_functions.clearData();
    expect(data.status).toEqual(200);

    data = await fetch_functions.getAllData();
    expect(data.status).toEqual(200);
    expect(data.length).toBe(0);

    // --- add data ---
    data = await fetch_functions.addData(user1);
    expect(data.status).toEqual(200);

    data = await fetch_functions.getAllData();
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Chris Roberts");

    // add a second with the same key which should be an error
    data = await fetch_functions.addData(user1);
    expect(data.status).toEqual(400);

    // add a second which should be ok
    data = await fetch_functions.addData(user2);
    expect(data.status).toEqual(200);

    // --- check data ---
    data = await fetch_functions.getAllData();
    expect(data.status).toEqual(200);
    expect(data.length).toBe(2);
    expect(data[1].name).toBe("Justin Cook");

    // --- delete data ---
    data = await fetch_functions.deleteData({ key: 1 });
    expect(data.status).toEqual(200);

    // --- reset countkey (keep track the key) ---
    data = await fetch_functions.resetCountKey();
    expect(data.status).toEqual(200);

    // --- get data key = 0 ---
    data = await fetch_functions.getData(0);
    expect(data[0]).toEqual({ authEmail: [], countKey: 0, key: 0 });

    // --- update countkey ---
    data = await fetch_functions.updateCountKey(data[0], 5);
    expect(data.status).toEqual(200);

    data = await fetch_functions.getData(0);
    expect(data[0]).toEqual({ authEmail: [], countKey: 5, key: 0 });

    // // --- update Authrized email for printing report ---
    data = await fetch_functions.addAuthUser(data[0], 'n.pitsini@gmail.com');

    // let emailList = ['n.pitsini@gmail.com', 'l.sarah@gmail.com'];
    // emailList.push('e.john@hotmail.com');

    // let authObj = { key: 0, countKey: 7, authEmail: emailList }
    // data = await fetch_functions.addAuthUser(data, authObj);
    // expect(data.status).toEqual(200);

    // data = await fetch_functions.getData(0);
    // console.log(data)
    // // expect(data.).toEqual(200);
});