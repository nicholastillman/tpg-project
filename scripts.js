// Requirements:
// - Your Application should allow a user to select a loyalty program
const app = document.querySelector('#app');
const buttons = document.querySelectorAll('button');
const inputs = document.querySelectorAll('#ticket-comparison input[type="text"]');
const select = document.querySelector('#loyalty-programs');

let endpoint = './_data/loyalty-1.json';
let currentTPG = '';

async function fetchLoyaltyPrograms() {
  const response = await fetch(endpoint);
  const data = await response.json();
  // console.log(data);
  return data;
}

async function handleSelectBoxValues() {
  // set the argument to the value of the select box
  const programs = await fetchLoyaltyPrograms();
  programs.items.forEach((program) => {
    let userEl = document.createElement('p');
    let options = document.createElement('option');
    app.appendChild(userEl);
    userEl.textContent = 'Loading....';
    options.textContent = program.name;
    select.appendChild(options);
  });
  // displayLoyaltyProgram(programs.items);
}
handleSelectBoxValues().catch(handleError);

async function displayLoyaltyProgram(programs) {
  console.log('Creating HTML');
  // populate the
  const html = programs.map(program => `${program.tpg_valuation && `<li>${program.tpg_valuation}</li>`}`);
  console.log(html);
}
async function calculatePointsPrice(program) {
  // Our Calculation - points price = Number of points * TPG Valuation of points currency + Fees
  const programPoints = await fetchLoyaltyPrograms();
  const availablePoints = document.querySelector('#points-amount').value; // entered by user
  const ticketPrice = document.querySelector('#ticket-price').value; // entered by user
  const fees = 5.65 * 2;

  programPoints.items.forEach((program) => {
    // if the program.name === selectBox.value get tpg_valuation for program.name
    if (select.value === program.name) {
      // get program tpg_valuation and calculate
      currentTPG = program.tpg_valuation;
      const pointsPrice = Math.round((availablePoints * currentTPG) + fees);
      console.log(pointsPrice);
    }
     /**
     * Todo: the below comparision is good candidate for function
     * Need to compare cash to points value and display message to recommend
     * using points rather than cash.
     */
  });
}

// Handle our errors
function handleError(err) {
  console.log(`Oh No! Something went wrong. Your request returned ${err}.`);
}
// Clear our inputs on submit or reset
function resetUserInput() {

  inputs.forEach(input => {
    input.value = '';
  });
}


// Event Listeners
window.addEventListener('DOMContentLoaded', handleSelectBoxValues);
buttons.forEach( (button)  => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'compare') {
      console.log('Comparing points to cash....');
      calculatePointsPrice();
    } else {
      resetUserInput();
      console.log('Resetting...');
    }
  })
});

// const loyaltyProgramData = fetch(endpoint);
// loyaltyProgramData.then(response => {
//   return response.json();
// })
// .then(data => {
//   data.forEach(d => {
//     // Add options to our select menu
//     let options = document.createElement('option');
//     let valuations = document.createElement('li');
//     options.textContent = d.name;
//     valuations.textContent = d.tpg_valuation;
//     loyaltyPrograms.appendChild(options);

//     // get the current value of the selection
//     loyaltyPrograms.value;
//   });
// })
// .catch(handleError)

// - Tell user how many points are required for user to purchase desired ticket
// - Tell user the fees for desired ticket
// - Ask a user how much a cash ticket costs
// const cashTicketCost = prompt( 'How much does your desired ticket cost?' );
// - Compare cash ticket vs points price and tell user to use cash or points based on that comparison
