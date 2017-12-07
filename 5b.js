const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

(async () => {
    let input = await readFile('./5a.bin', 'ascii');
    let insts = input.split('\r\n').map(x => Number(x));

    let i = 0;
    let steps = 0;

    while (true) {
        steps++;

        const jumps = insts[i];
        insts[i] += insts[i] >= 3 ? -1 : 1;
        i += jumps;

        if (i >= insts.length)
            break;
    }

    console.log(steps);
})();