const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

let seenBeforeLookup = [];

const highestValueIndex = (mem) => mem.indexOf(mem.reduce((prev, cur) => cur > prev ? cur : prev, 0));
const seenBefore = (arr) => seenBeforeLookup.includes(JSON.stringify(arr));
const addSeenBefore = (arr) => seenBeforeLookup.push(JSON.stringify(arr));
const getIndex = (len, n) => n % len;

(async () => {
    let input = await readFile('./6a.bin', 'ascii');
    let mem = input.split('\t').map(x => Number(x));

    const initialMem = [...mem];

    let again = true;

    while (true) {
        if (seenBefore(mem)) {
            if(again) {
                seenBeforeLookup = [];
                again = false;
            } else {
                break;
            }
        }

        addSeenBefore(mem);

        const hvi = highestValueIndex(mem);
        let realloc = mem[hvi];
        mem[hvi] = 0;

        let n = hvi + 1;

        while (realloc > 0) {
            realloc -= 1;
            const i = getIndex(mem.length, n);
            mem[i] = mem[i] + 1;
            n += 1;
        }
    }

    console.log(seenBeforeLookup.length);
})();