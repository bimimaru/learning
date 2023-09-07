function findMax(arr) {
    if (arr.length == 0) {
        return null;
    }

    let max = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] > max) {
            max = arr[i + 1];
        }
    }
    return max
}

function findMin(arr) {
    if (arr.length == 0) {
        return null;
    }

    let min = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] < min) {
            min = arr[i + 1];
        }
    }
    return min
}

module.exports = {
    findMax,
    findMin
}