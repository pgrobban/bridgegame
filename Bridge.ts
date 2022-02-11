import { getRandomArrayIndexes } from './utils.js';

export const bridgeStatuses = {
  safe: "S",
  hole: "H",
  unknown: "?",
};

export default class Bridge {
  constructor(bridgeLength, bridgeColumns, safeColumnsPerRow) {
    if (safeColumnsPerRow > bridgeColumns) {
      throw new Error('Number of safe columns per row cannot be more than the number of bridge columns');
    }

    this.bridgeLength = bridgeLength;
    this.bridgeColumns = bridgeColumns;
    this.safeColumnsPerRow = safeColumnsPerRow;

    this.initializeBridge();
    this.initializeSafeSpots();
  }

  initializeBridge() {
    const bridgeStatus = new Array(this.bridgeLength);
    for (let row = 0; row < this.bridgeLength; row++) {
      bridgeStatus[row] = new Array(this.bridgeColumns);
      for (let column = 0; column < this.bridgeColumns; column++) {
        bridgeStatus[row][column] = bridgeStatuses.unknown;
      }
    }
    this.bridgeStatus = bridgeStatus;
  }

  initializeSafeSpots() {
    const safeIndexesPerRow = new Array(this.bridgeLength);
    for (let row = 0; row < this.bridgeLength; row++) {
      safeIndexesPerRow[row] = getRandomArrayIndexes(this.bridgeColumns, this.safeColumnsPerRow);
    }
    this.safeIndexesPerRow = safeIndexesPerRow;
  }

  printBridge() {
    console.log("*** BRIDGE STATUS");
    console.log(JSON.stringify(this.bridgeStatus, null, 2));
  }

  printBridgeSafeSpots() {
    console.log("*** SAFE INDEX(ES)");
    console.log(JSON.stringify(this.safeIndexesPerRow, null, 2));
  }
}
