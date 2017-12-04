const nearest = (n, arr) => {
    var closest = arr.reduce((prev, cur) => (Math.abs(cur - n) < Math.abs(prev - n) ? cur : prev));
    return closest;
};

const input = 277678;

const corner = Math.pow(Math.ceil(Math.sqrt(input)), 2);
const cornerLower = Math.pow(Math.ceil(Math.sqrt(input)) - 1, 2);
const cornerNearest = nearest(input, [corner, cornerLower]);

const width = Math.ceil((corner - cornerLower) / 2);

const stepsToMiddle = Math.floor(Math.sqrt(input) / 2);
const stepsToCorner = cornerNearest == cornerLower ? Math.ceil(width / 2) : Math.floor(width / 2);

let middlePoint = cornerNearest == cornerLower ? cornerLower + stepsToCorner : corner - stepsToCorner;
let stepsToTarget = Math.abs(input - middlePoint);

console.log(stepsToMiddle + stepsToTarget);