const EntityBase = require('./EntityBase');

// const e = new EntityBase({
//     name: 'Matheus Morcinek',
//     gender: 'male'
// });

// console.log(e.name);

// console.log(e.birthDay);

const assert = require('assert');
const Employee = require('./employee');
const Manager = require('./manager');
const { emitKeypressEvents } = require('readline');

const GENDER = {
    male: 'male',
    female: 'female'
}

{
    const employee = new Employee({
        name: 'Matheus Morcinek',
        gender: GENDER.female
    });

    assert.throws(() => employee.birthYear, {
        message: 'You must define age first!!'
    });
}

{

    const employee = new Employee({
        name: 'Joaozinho',
        age: 20,
        gender: GENDER.male
    });

    assert.deepStrictEqual(employee.name, 'Mr. Joaozinho');
    assert.deepStrictEqual(employee.age, undefined);
    assert.deepStrictEqual(employee.gender, undefined);

    console.log(employee.name)
    console.log(employee.netPay);
}

{
    const manager = new Manager({   
        name: 'Mariazinha',
        age: 18,
        gender:  GENDER.female
    });

    console.log(manager.name);
    console.log(manager.netPay);
}

