Task: Build a tool that uses TPG's Evaluation to tell the user whether it is better to use
points or cash to book a plane ticket.

### Business logic:

You earn points from given loyalty currency, e.g Virgin Atlantic Flying Club miles, until you have enough for a ticket
You redeem points + fees for the ticket
Domestic fees are typical - $5.60 each way (domesticFee _ 2)
EX:
points price = Number of points _ TPG Valuation of points currency + Fees

You then compare points price to cash price. If points price is lower, reccomend customer use points

Goal: Build a simple application that recieves inputs from the user and tells them whether to use cash or points.

## Requirements:

- Your Application should allow a user to select a loyalty program
- Tell user how many points are required for user to purchase desired ticket
- Tell user the fees for desired ticket
- Ask a user how much a cash ticket costs
- Compare cash ticket vs points price and tell user to use cash or points based on that comparison

# Should tell RD/Points Guy how to build/run application.
