const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

class Instruction {
    constructor(name, inst, val, cond_a, cond, cond_b) {
        this.name = name;
        this.inst = inst;
        this.val = Number(val);

        this.cond_a = cond_a;
        this.cond = cond;
        this.cond_b = Number(cond_b);
    }
}

const invertNumber = (n) => n > 0 ? (n * -1) : Math.abs(n);

(async () => {
    let input = await readFile('./8a.bin', 'ascii');
    let lines = input.split('\r\n');

    let instructions = [];
    let registers = {};

    for (const l of lines) {
        const res = /(\w+) (\w+) ([-0-9]+|[0-9]+) if (\w+) ([\!\=\<\>]+) ([-0-9]+|[0-9]+)/.exec(l);
        instructions.push(new Instruction(res[1], res[2], res[3], res[4], res[5], res[6], res[7]));
    }

    // initialize all registers
    for (const inst of instructions)
        registers[inst.name] = 0;

    for (const inst of instructions) {
        let res = registers[inst.name];

        if (inst.inst === 'inc')
            res += inst.val;
        else if (inst.inst === 'dec')
            res -= inst.val;

        const s = registers[inst.cond_a] + inst.cond + inst.cond_b;
        const b = eval(s);

        if (b) {
            registers[inst.name] = res;
        }
    }

    const max = Object.keys(registers).reduce((acc, cur) => registers[cur] > acc ? registers[cur] : acc, -Infinity);
    console.log(max);
})();