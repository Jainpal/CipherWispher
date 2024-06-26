function caesarCipher(str, shift, encode = true) {
    if (!encode) shift = (26 - shift) % 26; // Adjust shift for decoding

    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            const shiftBase = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - shiftBase + shift) % 26) + shiftBase);
        }
        return char;
    }).join('');
}

function processText(mode) {
    const shiftInput = document.getElementById(mode + 'Shift');
    const shift = parseInt(shiftInput.value);
    const inputText = document.getElementById(mode + 'Input').value.trim();

    // Clear previous errors
    clearErrorMessages();

    // Validate shift value
    if (isNaN(shift) || shift < -25 || shift > 25) {
        displayErrorMessage(mode + 'ShiftError', 'Shift must be an integer between -25 and 25.');
        return;
    }

    // Validate input text
    if (mode === 'encode' && inputText.match(/\d/)) {
        displayErrorMessage(mode + 'InputError', 'Input text cannot contain numbers for encoding.');
        return;
    } else if (mode === 'decode' && inputText.match(/[0-9]/)) {
        displayErrorMessage(mode + 'InputError', 'Input text cannot contain numbers for decoding.');
        return;
    }

    // Perform encoding or decoding
    const encode = mode === 'encode';
    const outputText = caesarCipher(inputText, shift, encode);
    document.getElementById(mode + 'Output').value = outputText;

    // Optional: Update character count
    updateCharacterCount(mode, outputText);
}

function showEncode() {
    fadeIn(document.getElementById('encodeSection'));
    fadeOut(document.getElementById('decodeSection'));
    toggleActive(document.getElementById('encodeTab'), document.getElementById('decodeTab'));
}

function showDecode() {
    fadeIn(document.getElementById('decodeSection'));
    fadeOut(document.getElementById('encodeSection'));
    toggleActive(document.getElementById('decodeTab'), document.getElementById('encodeTab'));
}

function fadeIn(element) {
    element.style.display = 'block';
    element.classList.add('fade');
    setTimeout(() => {
        element.classList.add('show');
    }, 10); // Adding slight delay for smoother transition
}

function fadeOut(element) {
    element.classList.remove('show');
    setTimeout(() => {
        element.style.display = 'none';
        element.classList.remove('fade');
    }, 500); // Matches animation duration
}

function toggleActive(activeTab, inactiveTab) {
    activeTab.classList.add('active', 'btn-primary');
    activeTab.classList.remove('btn-secondary');
    inactiveTab.classList.remove('active', 'btn-primary');
    inactiveTab.classList.add('btn-secondary');
}

function displayErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.innerText = message;
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.text-danger');
    errorElements.forEach(element => {
        element.innerText = '';
    });
}

// Optional: Update character count in output
function updateCharacterCount(mode, text) {
    const countElement = document.getElementById(mode + 'CharCount');
    if (countElement) {
        countElement.innerText = text.length + ' characters';
    }
}

// Optional: Copy text to clipboard
function copyToClipboard(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    textarea.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    alert('Copied to clipboard!');
}
