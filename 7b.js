const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const inAnyAbove = (id, arr) => arr.some(x => x.above.includes(id));
const calcTowerWeight = (above, sum = 0) => {
    if (above.length === 0)
        return sum;

    let objAbove = toObj(above);
    const plates = objAbove
        .map(x => toObj(x.above))
        .map(x => x.reduce((acc, cur) => acc += cur.weight, 0));

    // objAbove.forEach(x => {
    //     sums.push(calcTowerWeight(x.above, 0));
    // });

    let nextAbove = objAbove.reduce((acc, val) => acc.concat(val.above), []);

    sum += objAbove.reduce((acc, val, i, a) => acc += val.weight, 0);
    let diffs = objAbove.filter(x => x.weight !== objAbove[0].weight);

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

    let nextLevel = [bottom];
    let even = false;
    while (!even) {
        let weight = [];

        nextLevel.forEach((a, i) => {
            weight[i] = [];
            a.above.forEach((b, k) => {
                weight[i][k] = calcTowerWeight([b]);
            });
        });
        // nextLevel.above.forEach((x, i) => {
        //     weight[i] = calcTowerWeight([x]);
        // });


        let min = Math.min(...weight);
        let max = Math.max(...weight);

        even = min === max;
        // let diff = weight.filter(x => x === min).length < weight.filter(x => x === max).length ? min : max;
        nextLevel = nextLevel
    }

    // console.log(weight, diff);
    console.log('x');
})();