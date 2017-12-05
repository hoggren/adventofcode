const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

(async () => {
    const splitEnumerator = function* (rows, char) {
        for (let i = 0; i < rows.length; i++) {
            const out = rows[i].split(char);
            yield out;
        }
    }

    const countDupes = (passwords) => {
        let dupes = 0;

        for (const password of splitEnumerator(passwords, ' ')) {
            if (password.some(x => password.filter(y => x == y).length > 1)) {
                dupes += 1;
            }
        }

        return dupes;
    };

    const countDupes2 = (passwords) => {
        let dupes = 0;

        for (let i = 0; i < passwords.length; i++) {
            const pw = passwords[i].split(' ');

            for (let k = 0; k < pw.length; k++) {
                if (pw.filter(x => x === pw[k]).length > 1) {
                    dupes += 1;
                    break;
                }
            }
        }

        return dupes;
    };

    let input = await readFile('./4a.bin', 'ascii');
    const passwords = input.split('\r\n');

    const dupes = countDupes(passwords);

    console.log(passwords.length - dupes);
})();

