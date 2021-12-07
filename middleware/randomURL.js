

const randomURL = function() {
    var urlCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    let createdURL = ""
    
    for (var i = 0; i < 12; i++) {
        createdURL = createdURL + urlCharacters[Math.floor(Math.random() * urlCharacters.length)]
    }
    
    return createdURL
}




module.exports = randomURL