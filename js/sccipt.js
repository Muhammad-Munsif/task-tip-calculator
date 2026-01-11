
    document.addEventListener("DOMContentLoaded", function () {
      // DOM Elements
      const billInput = document.getElementById("bill");
      const tipButtons = document.querySelectorAll(".tip-btn");
      const customTipInput = document.getElementById("custom-tip");
      const peopleInput = document.getElementById("people");
      const tipAmountDisplay = document.getElementById("tip-amount");
      const totalAmountDisplay = document.getElementById("total-amount");
      const resetButton = document.getElementById("reset");
      const billError = document.getElementById("bill-error");
      const peopleError = document.getElementById("people-error");
      
      // State variables
      let billAmount = 0;
      let tipPercentage = 15; // Default to 15%
      let numberOfPeople = 1;
      
      // Initialize with the default active button
      activateTipButton(document.querySelector('.tip-btn[data-percent="15"]'));
      
      // Event Listeners
      billInput.addEventListener("input", validateAndCalculate);
      customTipInput.addEventListener("input", handleCustomTip);
      peopleInput.addEventListener("input", validateAndCalculate);
      resetButton.addEventListener("click", resetCalculator);
      
      // Add click event to all tip buttons
      tipButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          tipButtons.forEach(btn => {
            btn.classList.remove("active");
          });
          
          // Add active class to clicked button
          this.classList.add("active");
          
          // Set tip percentage and clear custom tip
          tipPercentage = parseInt(this.getAttribute("data-percent"));
          customTipInput.value = "";
          
          validateAndCalculate();
        });
      });
      
      // Validate inputs and calculate tip
      function validateAndCalculate() {
        const billValid = validateBill();
        const peopleValid = validatePeople();
        
        if (billValid && peopleValid) {
          calculateTip();
          updateResetButton();
        }
      }
      
      // Validate bill input
      function validateBill() {
        const billValue = parseFloat(billInput.value);
        
        if (isNaN(billValue) || billValue < 0) {
          billInput.classList.add("invalid");
          billError.style.display = "block";
          return false;
        } else {
          billInput.classList.remove("invalid");
          billError.style.display = "none";
          billAmount = billValue;
          return true;
        }
      }
      
      // Validate people input
      function validatePeople() {
        const peopleValue = parseInt(peopleInput.value);
        
        if (isNaN(peopleValue) || peopleValue < 1) {
          peopleInput.classList.add("invalid");
          peopleError.style.display = "block";
          return false;
        } else {
          peopleInput.classList.remove("invalid");
          peopleError.style.display = "none";
          numberOfPeople = peopleValue;
          return true;
        }
      }
      
      // Handle custom tip input
      function handleCustomTip() {
        const customTip = parseInt(customTipInput.value);
        
        if (!isNaN(customTip) && customTip > 0 && customTip <= 100) {
          // Remove active class from all buttons
          tipButtons.forEach(btn => {
            btn.classList.remove("active");
          });
          
          tipPercentage = customTip;
          validateAndCalculate();
        }
        
        updateResetButton();
      }
      
      // Calculate tip and total amounts
      function calculateTip() {
        const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
        const totalAmount = (billAmount / numberOfPeople) + tipAmount;
        
        updateDisplay(tipAmount, totalAmount);
      }
      
      // Update the display with calculated values
      function updateDisplay(tipAmount, totalAmount) {
        // Add fade animation
        tipAmountDisplay.classList.add("fade-in");
        totalAmountDisplay.classList.add("fade-in");
        
        // Update values
        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
        
        // Remove animation class for next calculation
        setTimeout(() => {
          tipAmountDisplay.classList.remove("fade-in");
          totalAmountDisplay.classList.remove("fade-in");
        }, 300);
      }
      
      // Reset calculator to initial state
      function resetCalculator() {
        // Reset inputs
        billInput.value = "";
        customTipInput.value = "";
        peopleInput.value = "1";
        
        // Reset state
        billAmount = 0;
        tipPercentage = 15;
        numberOfPeople = 1;
        
        // Reset display
        updateDisplay(0, 0);
        
        // Reset buttons to default (15%)
        tipButtons.forEach(btn => btn.classList.remove("active"));
        activateTipButton(document.querySelector('.tip-btn[data-percent="15"]'));
        
        // Remove validation errors
        billInput.classList.remove("invalid");
        peopleInput.classList.remove("invalid");
        billError.style.display = "none";
        peopleError.style.display = "none";
        
        // Disable reset button
        resetButton.disabled = true;
      }
      
      // Activate a tip button
      function activateTipButton(button) {
        if (button) {
          button.classList.add("active");
        }
      }
      
      // Update reset button state
      function updateResetButton() {
        const hasValue = 
          billInput.value !== "" || 
          customTipInput.value !== "" || 
          peopleInput.value !== "1" || 
          tipPercentage !== 15;
        
        resetButton.disabled = !hasValue;
      }
      
      // Initial calculation
      validateAndCalculate();
    });
