import Bridge, { bridgeStatuses } from './Bridge.js';

// we can change these
const players = 10;
const bridgeLength = 15;
const bridgeColumns = 2;
const safeColumnsPerRow = 1;

const bridge = new Bridge(bridgeLength, bridgeColumns, safeColumnsPerRow);
bridge.printBridge();
bridge.printBridgeSafeSpots();

const steps = [];
// let's play
contestantLoop:
for (let player = 0; player < players; player++) {
  rowLoopForThisContestant:
  steps.push(`Player ${player} is getting ready in front of the bridge.`);

  for (let row = 0; row < bridgeLength; row++) {
    const rowHasKnownSafeColumn = bridge.bridgeStatus[row].some((columnStatus) => columnStatus === bridgeStatuses.safe);
    if (rowHasKnownSafeColumn) {
      steps.push(`Row ${row} has a known safe column ${knownSafeColumns[row]} so player will stand on it.`);
    } else {
      steps.push(`Row ${row} has no known safe columns yet, so player will take a guess.`);
      let randomColumn;
      findNoneHoleIndex:
      while (true) {
        randomColumn = Math.floor(Math.random() * bridgeColumns);
        if (bridge.bridgeStatus[row][randomColumn] === bridgeStatuses.unknown) {
          break findNoneHoleIndex;
        }
      }
      steps.push(`Player guesses ${randomColumn}. Let's see if they survive!`);
      if (bridge.safeIndexesPerRow.includes(randomColumn)) {
        steps.push(`${randomColumn} turned out to be safe.`);
        bridge.bridgeStatus[row][randomColumn] = bridgeStatuses.safe;

        if (row < bridgeLength) {
          steps.push(`Player ${player} will now stand in front of row ${row+1}`);
        } else {
          steps.push(`Player ${player} survived!`);
          player++;
        }
      } else {
        steps.push(`${randomColumn} turned out to be a hole! Oh no! Bye-bye player ${player}.`);
        bridge.bridgeStatus[row][randomColumn] = bridgeStatuses.hole;
        if (player === players - 1) {
          steps.push(`No contestants survived`);
        }
      }
    }
  }
}

steps.forEach((step) => console.log(step));
