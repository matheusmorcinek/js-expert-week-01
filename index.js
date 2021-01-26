const EntityBase = require('./EntityBase');

const e = new EntityBase({
    name: 'Matheus Morcinek',
    gender: 'male'
});

console.log(e.name);

console.log(e.birthDay);