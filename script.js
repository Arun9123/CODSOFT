let display = document.getElementById('display');
let currentInput = '';

function appendToDisplay(value) {
  currentInput += value;
  display.value = currentInput;
}

function clearDisplay() {
  currentInput = '';
  display.value = '';
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calculateResult() {
  try {
    currentInput = eval(currentInput);
    display.value = currentInput;
  } catch (error) {
    display.value = 'Error';
    currentInput = '';
  }
}

function calculatePercentage() {
  try {
    currentInput = (eval(currentInput) / 100).toString();
    display.value = currentInput;
  } catch (error) {
    display.value = 'Error';
    currentInput = '';
  }
}

function handleKeyboardInput(event) {
  const keyValue = event.key;
  if (/[0-9.+\-*/]/.test(keyValue)) {
    appendToDisplay(keyValue);
  } else if (keyValue === 'Enter' || keyValue === '=') {
    calculateResult();
  } else if (keyValue === 'Escape') {
    clearDisplay();
  } else if (keyValue === 'Backspace') {
    backspace();
  } else if (keyValue === '%') {
    // Handle the "%" key to calculate a percentage
    currentInput = (eval(currentInput) / 100).toString();
    display.value = currentInput;
  }
}

document.addEventListener('keydown', handleKeyboardInput);

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {

    if (button.classList.contains('percentage')) {
      backspace();
      calculatePercentage();
    }

    // Check if the button clicked is the clear button
    if (button.classList.contains('clear')) {
      // Change styles for the clear button
      button.style.backgroundColor = 'white'; // Change background color for clear button
      button.style.color = 'red'; // Change text color for better contrast
    } else {
      // Change styles for other buttons
      button.style.backgroundColor = 'white'; // Change background color for other buttons
      button.style.color = 'rgb(54, 50, 50)'; // Change text color for other buttons
    }

    // Revert the color after a short delay (e.g., 200 milliseconds)
    setTimeout(() => {
      // Check if the button clicked is the clear button
      if (button.classList.contains('clear')) {
        // Revert styles for the clear button
        button.style.backgroundColor = 'red'; // Revert background color for clear button
        button.style.color = 'white'; // Revert text color for clear button
      } else {
        // Revert styles for other buttons
        button.style.backgroundColor = 'rgb(54, 50, 50)'; // Revert background color for other buttons
        button.style.color = 'white'; // Revert text color for other buttons
      }
    }, 200); // Adjust the delay time as needed
  });
});
