function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

// not randomized at initialization
var randomized_indices = []

for (let i = 0; i < 350; i++) {
    randomized_indices.push(('00' + (i + 1).toString()).slice(-3))
}

// now randomized
shuffleArray(randomized_indices)