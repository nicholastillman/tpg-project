// Requirements:
// - Your Application should allow a user to select a loyalty program
// - Let user input how many points are required for user to purchase desired ticket
// - Let a user input how much a cash ticket costs
// - Tell user the fees for desired ticket
// - Compare cash ticket vs points price and tell user to use cash or points based on that comparison
/** BEGIN */
const app = document.querySelector('#app');
const buttons = document.querySelectorAll('button');
const curtain = document.querySelector('.curtain');
const inputs = document.querySelectorAll('#ticket-comparison input[type="text"]');
const pointsOutput = document.querySelector('.points-output');
const cashOutput = document.querySelector('.cash-output');
const comparison = document.querySelector('.comparison');
const select = document.querySelector('#loyalty-programs');

let endpoint = './src/_data/loyalty.json';
let currentTPG = '';
let selectedProgram;

let userEl = document.createElement('p');
userEl.setAttribute('class', 'h2');
app.appendChild(userEl);
/**
 * Fetch the Loaylty Program Data
 *
 * @param  {String} endpoint
 * @param  {Object} data
 */
async function fetchLoyaltyPrograms() {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
/**
 * Populates Select Box values
 *
 * @param {Object} programs
 */
async function handleSelectBoxValues() {
  // get the loyalty data.
  const programs = await fetchLoyaltyPrograms();

  // loop over and set the loyalty data.name to the value of the select box options
  programs.items.forEach((program) => {
    let options = document.createElement('option');
    options.id = program.id;
    options.textContent = program.name;
    options.value = `${program.name.toLowerCase().replace(/\s+/g, '')}`;
    select.appendChild(options);
  });
  displayLoyaltyProgram(programs.items);
}
handleSelectBoxValues().catch(handleError);

async function displayLoyaltyProgram(programs) {
  console.log('Creating HTML');
  select.options[select.selectedIndex].value;
  const html = programs.map(
    program => `<div class="program" id="program-${program.id}">
      <h2>${program.name}</h2>
      <div class="flex">
        ${program.icon_url &&
        `<a href="${program.website_url}"><img src="${program.icon_url}" alt="${program.name}"/></a>`
        }
        <p><span>${program.type}, ${program.loyalty_unit}</span></p>
      </div>
    </div>`
  );
  // comparison.innerHTML = html.join('');
  // comparison.insertAdjacentElement('afterbegin', html);

   /**
   * Todo: Add program.id's to options
   * Todo: Add icon next to Program
   * Todo: Add link to the program url for users to navigate and verify current prices.
   */
}
async function calculatePointsPrice() {
  // Our Calculation - points price = Number of points * TPG Valuation of points currency + Fees
  const programPoints = await fetchLoyaltyPrograms();
  const availablePoints = document.querySelector('#points-amount').value; // entered by user
  const ticketPrice = document.querySelector('#ticket-price').value; // entered by user
  const fees = 5.65 * 2;
  const programs = await fetchLoyaltyPrograms();

  programPoints.items.forEach((program) => {
    // if the program.name is equal to selectBox.value get tpg valuation for program
    let programName = program.name.toLowerCase().replace(/\s+/g, '')
    if (select.options[select.selectedIndex].value === programName) {
      // get program tpg_valuation and calculate
      currentTPG = program.tpg_valuation;
      const cashPrice = document.querySelector('#ticket-price').value;
      const pointsPrice = Math.round((availablePoints * currentTPG) + fees);
      cashOutput.textContent = `Cash Price: ${ticketPrice}`;
      pointsOutput.textContent = `Points Price: ${pointsPrice}`;

      // Compare and output the Result
      setTimeout(() => {
        compare(pointsPrice, cashPrice);
      }, 2500);
    }
    displayLoyaltyProgram(programs.items);
     /**
     * Todo: the below comparision is good candidate for function
     * Need to compare cash to points value and display message to recommend
     * using points rather than cash.
     */
  });
}
async function compare(p, c) {
  if ( p < c ) {
    app.innerHTML = `<h2>Use Points.</h2>`;
  } else if (c > p) {
    app.innerHTML = `<h2>Use Cash</h2>`;
  } else {
    app.innerHTML = 'Both options are good. Save points by using cash. Save money by using points.'
  }
  resetUserInput();
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
      userEl.textContent = 'Loading....';
      curtain.classList.add('curtain_is-active');
      userEl.textContent = 'Comparing points to cash....';
      curtain.appendChild(userEl);

      setTimeout(() => {
        curtain.classList.remove('curtain_is-active');
      }, 2000);

      calculatePointsPrice();
      // Todo: add some interactivity/animation delay and reset user input
    } else {
      resetUserInput();
      console.log('Resetting...');
    }
  })
});
