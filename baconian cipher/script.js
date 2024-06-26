// Baconian Cipher functions
function baconianEncode(text) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const baconianAlphabet = {
    A: "AAAAA", B: "AAAAB", C: "AAABA", D: "AAABB", E: "AABAA",
    F: "AABAB", G: "AABBA", H: "AABBB", I: "ABAAA", J: "ABAAB",
    K: "ABABA", L: "ABABB", M: "ABBAA", N: "ABBAB", O: "ABBBA",
    P: "ABBBB", Q: "BAAAA", R: "BAAAB", S: "BAABA", T: "BAABB",
    U: "BABAA", V: "BABAB", W: "BABBA", X: "BABBB", Y: "BBAAA", Z: "BBAAB"
  };

  text = text.toUpperCase(); // Convert to uppercase
  let encodedText = "";
  for (let char of text) {
    if (alphabet.includes(char)) {
      encodedText += baconianAlphabet[char] + ' '; // Add encoded letter with space
    } else {
      return "Error: Input contains invalid characters. Only uppercase letters (A-Z) are allowed.";
    }
  }
  return encodedText.trim(); // Remove trailing space
}

function baconianDecode(text) {
  const baconianAlphabet = {
    "AAAAA": "A", "AAAAB": "B", "AAABA": "C", "AAABB": "D", "AABAA": "E",
    "AABAB": "F", "AABBA": "G", "AABBB": "H", "ABAAA": "I", "ABAAB": "J",
    "ABABA": "K", "ABABB": "L", "ABBAA": "M", "ABBAB": "N", "ABBBA": "O",
    "ABBBB": "P", "BAAAA": "Q", "BAAAB": "R", "BAABA": "S", "BAABB": "T",
    "BABAA": "U", "BABAB": "V", "BABBA": "W", "BABBB": "X", "BBAAA": "Y", "BBAAB": "Z"
  };

  let decodedText = "";
  let parts = text.split(' ');
  for (let part of parts) {
    if (/^[AB]+$/.test(part.trim())) { // Check if part only contains 'A' or 'B'
      decodedText += baconianAlphabet[part.trim()]; // Add decoded letter
    } else {
      return "Error: Input for decoding can only contain 'A' or 'B'.";
    }
  }
  return decodedText;
}

// Copy text to clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Text copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy text to clipboard');
    });
}

// DOM manipulation and event listeners
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('encodeBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const cleanedInput = inputText.replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters
    if (cleanedInput !== inputText) {
      document.getElementById('encodedText').value = "Error: Input can only contain uppercase letters (A-Z).";
    } else {
      const encodedText = baconianEncode(cleanedInput);
      document.getElementById('encodedText').value = encodedText;
    }
  });

  document.getElementById('decodeBtn').addEventListener('click', function() {
    const encodedInput = document.getElementById('encodedInput').value;
    const cleanedInput = encodedInput.replace(/[^AB\s]/g, ''); // Remove non 'A' or 'B' characters and spaces
    if (cleanedInput !== encodedInput) {
      document.getElementById('decodedText').value = "Error: Input can only contain 'A', 'B', or spaces.";
    } else {
      const decodedText = baconianDecode(encodedInput);
      document.getElementById('decodedText').value = decodedText;
    }
  });

  document.getElementById('copyEncodedBtn').addEventListener('click', function() {
    const encodedText = document.getElementById('encodedText').value;
    if (encodedText.trim() !== '') {
      copyToClipboard(encodedText);
    } else {
      alert('Nothing to copy. Encode some text first.');
    }
  });

  document.getElementById('copyDecodedBtn').addEventListener('click', function() {
    const decodedText = document.getElementById('decodedText').value;
    if (decodedText.trim() !== '') {
      copyToClipboard(decodedText);
    } else {
      alert('Nothing to copy. Decode some text first.');
    }
  });
});
