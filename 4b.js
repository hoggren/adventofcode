const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

(async () => {
    const SortedWordEnumerator = function* (rows, char) {
        for (const row of rows) {
            const out = row.split(char).map(x => x.split('').sort().reduce((a, b) => a + b, ''));
            yield out;
        }
    };

    const countAnagrams = (wordArray) => {
        let anagrams = 0;

        for (const word of SortedWordEnumerator(wordArray, ' ')) {
            if (word.some(x => word.filter(y => x == y).length > 1)) {
                anagrams += 1;
            }
        }

        return anagrams;
    };

    let input = await readFile('./4a.bin', 'ascii');

    const passwords = input.split('\r\n');
    const anagramDupes = countAnagrams(passwords);

    console.log(passwords.length - anagramDupes);
})();

