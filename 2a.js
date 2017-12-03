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
        let highest = row.reduce((acc, n) => Math.max(acc, n));
        let lowest = row.reduce((acc, n) => Math.min(acc, n));
        return highest - lowest;
    }).reduce((acc, n) => acc + n);

    console.log(checksum);
})();
