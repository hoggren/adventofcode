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

    const splitCharsInWords = function* (words) {
        for (const word of words) {
            const out = word.split('');
            yield out;
        }
    }

    const countAnagrams = (wordArray) => {
        for (const word of splitEnumerator(wordArray, ' ')) {
            for (const c of splitCharsInWords(word)) {
                console.log(c);
            }
        }
    };

    let input = await readFile('./4a.bin', 'ascii');
    const passwords = input.split('\r\n');



    const dupes = countAnagrams(passwords);

    console.log(passwords.length - dupes);
})();

