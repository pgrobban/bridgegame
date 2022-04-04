import { getRandomArrayIndexes } from './utils.ts';

export enum BridgeStatus {
  safe = 'S',
  hole = "H",
  unknown = "?"
};

export default class Bridge {

  private status: BridgeStatus[][];
  private safeIndexesPerRow: number[][];

  constructor(private length: number, private columns: number, private safeColumnsPerRow: number) {
    if (safeColumnsPerRow > columns) {
      throw new Error('Number of safe columns per row cannot be more than the number of bridge columns');
    }

    this.initializeBridge();
    this.initializeSafeSpots();
  }

  initializeBridge() {
    const status = new Array(this.length);
    for (let row = 0; row < this.length; row++) {
      status[row] = new Array(this.columns);
      for (let column = 0; column < this.columns; column++) {
        status[row][column] = BridgeStatus.unknown;
      }
    }
    this.status = status;
  }

  initializeSafeSpots() {
    const safeIndexesPerRow = new Array(this.length);
    for (let row = 0; row < this.length; row++) {
      safeIndexesPerRow[row] = getRandomArrayIndexes(this.columns, this.safeColumnsPerRow);
    }
    this.safeIndexesPerRow = safeIndexesPerRow;
  }

  setStatus(row: number, column: number, status: BridgeStatus) {
    if (row < 0 || row >= this.length) {
      throw new Error('Blah');
    }
    this.status[row][column] = status;
  }

  getStatus(row: number, column?: number) {
    if (row < 0 || row >= this.length) {
      throw new Error('Blah');
    }

    if (column === null || column === undefined) {
      if (column < 0 || column >= this.columns) {
        throw new Error('Blah');
      }

      return this.status[row];
    }

    return this.status[row][column];
  }

  getSafeIndexesPerRow(row: number) {
    return this.safeIndexesPerRow[row];
  }

  printBridge() {
    console.log("*** BRIDGE STATUS");
    console.log(JSON.stringify(this.status, null, 2));
  }

  printBridgeSafeSpots() {
    console.log("*** SAFE INDEX(ES)");
    console.log(JSON.stringify(this.safeIndexesPerRow, null, 2));
  }
}
