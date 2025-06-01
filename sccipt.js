document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const billInput = document.getElementById('bill');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const customTipInput = document.getElementById('custom-tip');
    const peopleInput = document.getElementById('people');
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');
    const resetButton = document.getElementById('reset');
    
    // Variables
    let billAmount = 0;
    let tipPercentage = 15; // Default to 15%
    let numberOfPeople = 1;
    
    // Initialize with the default active button (15%)
    setActiveButton(document.querySelector('.tip-btn[data-percent="15"]'));
    
    // Event Listeners
    billInput.addEventListener('input', handleInputChange);
    customTipInput.addEventListener('input', handleCustomTip);
    peopleInput.addEventListener('input', handleInputChange);
    resetButton.addEventListener('click', resetCalculator);
    
    // Add click event to all tip buttons
    tipButtons.forEach(button => {
        button.addEventListener('click', function() {
            setActiveButton(this);
            tipPercentage = parseInt(this.getAttribute('data-percent'));
            customTipInput.value = '';
            calculateTip();
            updateResetButton();
        });
    });
    
    // Functions
    function handleInputChange() {
        calculateTip();
        updateResetButton();
    }
    
    function handleCustomTip() {
        const customTip = parseInt(customTipInput.value) || 0;
        
        if (customTip > 0) {
            // Remove active class from all buttons
            tipButtons.forEach(btn => resetButtonState(btn));
            
            tipPercentage = customTip;
            calculateTip();
        }
        updateResetButton();
    }
    
    function calculateTip() {
        billAmount = parseFloat(billInput.value) || 0;
        numberOfPeople = parseInt(peopleInput.value) || 1;
        
        const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
        const totalAmount = (billAmount / numberOfPeople) + tipAmount;
        
        updateDisplay(tipAmount, totalAmount);
    }
    
    function updateDisplay(tipAmount, totalAmount) {
        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }
    
    function resetCalculator() {
        // Reset inputs
        billInput.value = '';
        customTipInput.value = '';
        peopleInput.value = '1';
        
        // Reset variables
        billAmount = 0;
        tipPercentage = 15;
        numberOfPeople = 1;
        
        // Reset display
        updateDisplay(0, 0);
        
        // Reset buttons to default (15%)
        tipButtons.forEach(btn => resetButtonState(btn));
        setActiveButton(document.querySelector('.tip-btn[data-percent="15"]'));
        
        // Disable reset button
        resetButton.disabled = true;
    }
    
    function setActiveButton(button) {
        tipButtons.forEach(btn => resetButtonState(btn));
        button.classList.remove('bg-gray-100', 'text-gray-800');
        button.classList.add('active', 'bg-teal-600', 'text-white');
    }
    
    function resetButtonState(button) {
        button.classList.remove('active', 'bg-teal-600', 'text-white');
        button.classList.add('bg-gray-100', 'text-gray-800');
    }
    
    function updateResetButton() {
        const hasValue = billInput.value !== '' || 
                        customTipInput.value !== '' || 
                        peopleInput.value !== '1' || 
                        tipPercentage !== 15;
        
        resetButton.disabled = !hasValue;
    }
});




// document.addEventListener('DOMContentLoaded', function() {
//     // DOM Elements
//     const billInput = document.getElementById('bill');
//     const tipButtons = document.querySelectorAll('.tip-btn');
//     const customTipInput = document.getElementById('custom-tip');
//     const peopleInput = document.getElementById('people');
//     const tipAmountDisplay = document.getElementById('tip-amount');
//     const totalAmountDisplay = document.getElementById('total-amount');
//     const resetButton = document.getElementById('reset');
    
//     // Variables
//     let billAmount = 0;
//     let tipPercentage = 15; // Default to 15%
//     let numberOfPeople = 1;
    
//     // Initialize with the default active button (15%)
//     setActiveButton(document.querySelector('.tip-btn[data-percent="15"]'));
    
//     // Event Listeners
//     billInput.addEventListener('input', calculateTip);
//     customTipInput.addEventListener('input', handleCustomTip);
//     peopleInput.addEventListener('input', calculateTip);
//     resetButton.addEventListener('click', resetCalculator);
    
//     // Add click event to all tip buttons
//     tipButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             // Remove active class from all buttons
//             tipButtons.forEach(btn => btn.classList.remove('active', 'bg-teal-600', 'text-white'));
//             tipButtons.forEach(btn => btn.classList.add('bg-gray-100', 'text-gray-800'));
            
//             // Add active class to clicked button
//             this.classList.remove('bg-gray-100', 'text-gray-800');
//             this.classList.add('active', 'bg-teal-600', 'text-white');
            
//             // Get the tip percentage
//             tipPercentage = parseInt(this.getAttribute('data-percent'));
            
//             // Clear custom tip if any
//             customTipInput.value = '';
            
//             calculateTip();
//         });
//     });
    
//     // Functions
//     function calculateTip() {
//         // Get values from inputs
//         billAmount = parseFloat(billInput.value) || 0;
//         numberOfPeople = parseInt(peopleInput.value) || 1;
        
//         // Calculate tip and total
//         const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
//         const totalAmount = (billAmount / numberOfPeople) + tipAmount;
        
//         // Update the UI
//         updateDisplay(tipAmount, totalAmount);
        
//         // Enable/disable reset button
//         resetButton.disabled = billAmount === 0 && tipPercentage === 15 && numberOfPeople === 1;
//     }
    
//     function handleCustomTip() {
//         // Get custom tip value
//         const customTip = parseInt(customTipInput.value) || 0;
        
//         if (customTip > 0) {
//             // Remove active class from all buttons
//             tipButtons.forEach(btn => {
//                 btn.classList.remove('active', 'bg-teal-600', 'text-white');
//                 btn.classList.add('bg-gray-100', 'text-gray-800');
//             });
            
//             // Set custom tip percentage
//             tipPercentage = customTip;
            
//             calculateTip();
//         }
//     }
    
//     function updateDisplay(tipAmount, totalAmount) {
//         tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
//         totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
//     }
    
//     function resetCalculator() {
//         // Reset inputs
//         billInput.value = '';
//         customTipInput.value = '';
//         peopleInput.value = '1';
        
//         // Reset variables
//         billAmount = 0;
//         tipPercentage = 15;
//         numberOfPeople = 1;
        
//         // Reset display
//         tipAmountDisplay.textContent = '$0.00';
//         totalAmountDisplay.textContent = '$0.00';
        
//         // Reset buttons to default (15%)
//         tipButtons.forEach(btn => btn.classList.remove('active', 'bg-teal-600', 'text-white'));
//         tipButtons.forEach(btn => btn.classList.add('bg-gray-100', 'text-gray-800'));
//         setActiveButton(document.querySelector('.tip-btn[data-percent="15"]'));
        
//         // Disable reset button
//         resetButton.disabled = true;
//     }
    
//     function setActiveButton(button) {
//         button.classList.remove('bg-gray-100', 'text-gray-800');
//         button.classList.add('active', 'bg-teal-600', 'text-white');
//     }
// });