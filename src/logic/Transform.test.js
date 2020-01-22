import { functions, Account, AccountController } from './AccountPojo'

// Function for creating new accounts
function createAccounts(controller) {
    controller.addAccount(1, 'checking', 50);
    controller.addAccount(2, 'saving', 500);
    controller.addAccount(3, 'house saving', 100);
    controller.addAccount(4, 'education saving', 300);
}

// ========== 130A - Account ==========
test('Account - deposit, withdraw, balance', () => {
    const newAccount = new Account(1, 'checkingAccount', 25);
    expect(newAccount.checkBalance()).toEqual(25);

    newAccount.deposit(10);
    expect(newAccount.checkBalance()).toEqual(35);

    newAccount.withdraw(30);
    expect(newAccount.checkBalance()).toEqual(5);
});

// ========== 130C - Multiple Account ==========
test('Add Account', () => {
    const controller = new AccountController();

    expect(controller.allAccounts.length).toEqual(0);

    controller.addAccount(1, 'checking', 50);
    expect(controller.allAccounts.length).toEqual(1);

    controller.addAccount(2, 'saving', 100);
    expect(controller.allAccounts.length).toEqual(2);
});

test('Remove Account', () => {
    const controller = new AccountController();
    createAccounts(controller); 

    expect(controller.allAccounts[2].accountName).toEqual('house saving');
    controller.removeAccount(2);

    expect(controller.allAccounts[2].accountName).not.toEqual('house saving');
});

test('Total Balance', () => {
    const controller = new AccountController();
    createAccounts(controller); 

    expect(controller.totalBalance()).toEqual(950);
});

test('Check Highest Value', () => {
    const controller = new AccountController();
    createAccounts(controller); 

    expect(controller.checkHighest()).toEqual(500);
});

test('Check Lowest Value', () => {    
    const controller = new AccountController();
    createAccounts(controller);  

    expect(controller.checkLowest()).toEqual(50);
});


test('Create new div', () => {
    const newDiv = functions.createShowArea();
    expect(newDiv.childElementCount).toEqual(3);
});

test('round 2 digits', () => {
    expect(functions.round2Digit(5.8958)).toBeCloseTo(5.90);
});