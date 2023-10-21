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

// Add a "Tab" keypress event to indent text
codeEditor.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default tab behavior
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;

        // Insert a tab character (or spaces) at the cursor position
        const tabCharacter = '    '; // Use four spaces for each tab, adjust as needed
        codeEditor.value = codeEditor.value.substring(0, start) + tabCharacter + codeEditor.value.substring(end);
        
        // Set the cursor position after the inserted tab character(s)
        codeEditor.selectionStart = codeEditor.selectionEnd = start + tabCharacter.length;
    }
});
