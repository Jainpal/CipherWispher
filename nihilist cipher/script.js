function generatePolybiusSquare() {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note that 'J' is omitted in Polybius square
    let square = {};
    let index = 0;

    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 5; col++) {
            square[alphabet[index]] = `${row}${col}`;
            index++;
        }
    }

    return square;
}

function encode() {
    const inputText = document.getElementById('encodeInput').value.trim();
    const key = document.getElementById('encodeKey').value.trim();
    const errorOutput = document.getElementById('encodeOutput');

    // Clear previous error messages
    errorOutput.value = '';

    // Validate input
    if (inputText === '') {
        errorOutput.value = 'Please enter text to encode.';
        return;
    }
    if (!/^[A-Z]+$/.test(inputText)) {
        errorOutput.value = 'Input must contain only uppercase letters (A-Z).';
        return;
    }
    if (key === '') {
        errorOutput.value = 'Please enter a key.';
        return;
    }
    if (!/^[a-zA-Z]+$/.test(key)) {
        errorOutput.value = 'Key must contain only letters (A-Z or a-z).';
        return;
    }

    // Convert key to uppercase for consistency
    const upperCaseKey = key.toUpperCase();

    // Proceed with encoding
    const square = generatePolybiusSquare();
    let keyIndex = 0;
    let encodedText = '';

    for (let char of inputText) {
        if (square[char]) {
            const numPair = square[char];
            const keyPair = square[upperCaseKey[keyIndex % upperCaseKey.length]];
            const encodedPair = (parseInt(numPair[0]) + parseInt(keyPair[0])) + '' + (parseInt(numPair[1]) + parseInt(keyPair[1]));
            encodedText += encodedPair + ' ';
            keyIndex++;
        } else {
            encodedText += char;
        }
    }

    document.getElementById('encodeOutput').value = encodedText.trim();
}

function decode() {
    const encodedText = document.getElementById('decodeInput').value.trim().split(' ');
    const key = document.getElementById('decodeKey').value.trim();
    const errorOutput = document.getElementById('decodeOutput');

    // Clear previous error messages
    errorOutput.value = '';

    // Validate input
    if (encodedText[0] === '') {
        errorOutput.value = 'Please enter text to decode.';
        return;
    }
    if (!/^\d+$/.test(encodedText.join('').replace(/\s+/g, ''))) {
        errorOutput.value = 'Encoded text must contain only numeric pairs (e.g., 11 22 34).';
        return;
    }
    if (key === '') {
        errorOutput.value = 'Please enter a key.';
        return;
    }
    if (!/^[a-zA-Z]+$/.test(key)) {
        errorOutput.value = 'Key must contain only letters (A-Z or a-z).';
        return;
    }

    // Convert key to uppercase for consistency
    const upperCaseKey = key.toUpperCase();

    // Proceed with decoding
    const square = generatePolybiusSquare();
    let keyIndex = 0;
    let decodedText = '';

    const reverseSquare = Object.fromEntries(Object.entries(square).map(([k, v]) => [v, k]));

    for (let encodedPair of encodedText) {
        if (encodedPair.length === 2) {
            const keyPair = square[upperCaseKey[keyIndex % upperCaseKey.length]];
            const decodedRow = parseInt(encodedPair[0]) - parseInt(keyPair[0]);
            const decodedCol = parseInt(encodedPair[1]) - parseInt(keyPair[1]);
            const decodedChar = reverseSquare[`${decodedRow}${decodedCol}`];
            decodedText += decodedChar;
            keyIndex++;
        } else {
            decodedText += encodedPair;
        }
    }

    document.getElementById('decodeOutput').value = decodedText;
}

function copyToClipboard(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand('copy');
        alert('Copied to clipboard');
    } catch (err) {
        alert('Failed to copy');
    }
}
``
