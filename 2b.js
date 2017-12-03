const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

(async () => {
    let input;

    try {
        input = (await readFile('./2_input.bin', 'ascii'))
            .split(/\n/)
            .map(row => row.split(/\t+/).map(x => Number(x)));
    } catch (err) {
        process.exit(1);
    }

    let checksum = input.map(row => {
        let res = 0;

        for (let i = 0; i < row.length; i++) {
            const x = row[i];

            let dividablePairs = row
                .map(y => (((x > y) ? x : y) % ((x <= y) ? x : y) === 0 && y !== x) ? [x, y] : undefined)
                .filter(x => x !== undefined);

            if (dividablePairs.length === 1) {
                const pair = [].concat.apply([], dividablePairs);
                res = Math.max.apply(null, pair) / Math.min.apply(null, pair);
                break;
            };
        }

        return res;
    }).reduce((prev, cur) => prev + cur, 0);

    console.log(checksum);
})();
