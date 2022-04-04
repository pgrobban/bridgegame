import Bridge, { BridgeStatus } from "./Bridge.ts";

// we can change these
const players = 10;
const bridgeLength = 15;
const bridgeColumns = 2;
const safeColumnsPerRow = 1;

const bridge = new Bridge(bridgeLength, bridgeColumns, safeColumnsPerRow);
bridge.printBridge();
bridge.printBridgeSafeSpots();

const steps = [];
let survivors = 0;

// let's play
for (let player = 0; player < players; player++) {
  steps.push(`Player ${player + 1} is getting ready in front of the bridge.`);

  for (let row = 0; row < bridgeLength; row++) {
    const rowHasKnownSafeColumn = (
      bridge.getStatus(row) as BridgeStatus[]
    ).some((columnStatus) => columnStatus === BridgeStatus.safe);
    if (rowHasKnownSafeColumn) {
      steps.push(
        `Row ${row} has a known safe column ${bridge.getSafeIndexesPerRow(
          row
        )} so player ${player + 1} will stand on it.`
      );
    } else {
      steps.push(
        `Row ${row} has no known safe columns yet, so player ${
          player + 1
        } will take a guess.`
      );
      let randomColumn;
      while (true) {
        randomColumn = Math.floor(Math.random() * bridgeColumns);
        if (bridge.getStatus(row, randomColumn) === BridgeStatus.unknown) {
          break;
        }
      }
      steps.push(`Player ${player + 1} guesses ${randomColumn}. Let's see if they survive!`);
      if (bridge.getSafeIndexesPerRow(row).includes(randomColumn)) {
        steps.push(`${randomColumn} turned out to be safe.`);
        bridge.setStatus(row, randomColumn, BridgeStatus.safe);
      } else {
        steps.push(
          `${randomColumn} turned out to be a hole! Oh no! Bye-bye player ${
            player + 1
          }.`
        );
        bridge.setStatus(row, randomColumn, BridgeStatus.hole);
        break;
      }
    }

    if (row < bridgeLength - 1) {
      steps.push(
        `Player ${player + 1} will now stand in front of row ${row + 1}.`
      );
    } else {
      steps.push(`Player ${player + 1} survived!`);
      survivors++;
    }
  }
}

steps.forEach((step) => console.log(step));
console.log("Survivors:", survivors);

const blah = 42;
export default blah;
