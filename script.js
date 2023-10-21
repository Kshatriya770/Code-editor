// Get elements from the DOM
const codeEditor = document.getElementById('code-editor');
const copyButton = document.getElementById('copy-button');
const saveButton = document.getElementById('save-button');
const lockButton = document.getElementById('lock-button');

// Add event listeners and functionality
copyButton.addEventListener('click', () => {
    codeEditor.select();
    document.execCommand('copy');
});

lockButton.addEventListener('click', () => {
    codeEditor.disabled = !codeEditor.disabled;
    lockButton.innerText = codeEditor.disabled ? 'Unlock' : 'Lock';
});

// Automatic indentation and bracket completion
codeEditor.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;
        const indent = '    '; // Four spaces for indentation, adjust as needed

        // Insert a new line and proper indentation
        codeEditor.value =
            codeEditor.value.substring(0, start) +
            '\n' + indent +
            codeEditor.value.substring(end);

        // Set the cursor position after the inserted new line and indentation
        codeEditor.selectionStart = codeEditor.selectionEnd = start + indent.length;
    } else if (event.key === '(' || event.key === '[' || event.key === '{') {
        event.preventDefault();

        // Insert an opening bracket and move the cursor inside
        const start = codeEditor.selectionStart;
        const bracket = event.key;
        const matchingBracket = (bracket === '(') ? ')' : (bracket === '[') ? ']' : '}';
        codeEditor.value =
            codeEditor.value.substring(0, start) +
            bracket + matchingBracket +
            codeEditor.value.substring(start);

        // Set the cursor position inside the brackets
        codeEditor.selectionStart = codeEditor.selectionEnd = start + 1;
    }
});

// Detect and auto-close brackets when a closing bracket is typed
codeEditor.addEventListener('input', (event) => {
    const cursorPosition = codeEditor.selectionStart;
    const code = codeEditor.value;
    const closeBrackets = [')', ']', '}'];
    const openBrackets = ['(', '[', '{'];

    if (closeBrackets.includes(event.data) && cursorPosition < code.length) {
        const nextChar = code[cursorPosition];
        if (nextChar === event.data) {
            // If a closing bracket is typed right after another closing bracket, do nothing
            event.preventDefault();
        } else if (openBrackets.includes(nextChar)) {
            // If a closing bracket is typed after an opening bracket, move the cursor over it
            event.preventDefault();
            codeEditor.selectionStart = codeEditor.selectionEnd = cursorPosition + 1;
        }
    }
});
