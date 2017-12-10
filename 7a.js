const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const inAnyAbove = (id, arr) => arr.some(x => x.above.includes(id));
const calcTowerWeight = (above, sum = 0) => {
    if (above.length === 0)
        return sum;

    let objAbove = toObj(above);
    let nextAbove = objAbove.reduce((acc, val) => acc.concat(val.above), []);
    sum += objAbove.reduce((acc, val, i, a) => acc += val.weight, 0);

    return calcTowerWeight(nextAbove, sum);
};
const toObj = (above) => above.reduce((acc, id) => acc.concat(objArr.find(x => x.id === id)), []);

const objArr = [];

(async () => {
    let input = await readFile('./7a.bin', 'ascii');
    let lines = input.split('\r\n');

    for (const l of lines) {
        let id = /\w+/.exec(l)[0];
        let weight = Number(/\d+/.exec(l)[0]);
        let above = /(-> )(.+)/.exec(l);
        above = above ? above[2].split(', ') : [];

        objArr.push({ weight, id, above });
    }

    let bottom = null;

    for (const o of objArr) {
        if (!inAnyAbove(o.id, objArr)) {
            bottom = o;
            break;
        }
    }

    console.log(bottom);

    let weight = [];

    bottom.above.forEach((x, i) => {
        weight[i] = calcTowerWeight([x]);
    });

    console.log(weight);

    let diff = weight.reduce((acc, val) => acc = acc > val ? val : acc, Infinity);
})();