function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function getRandomArrayIndexes(maxIndex, length) {
  const arrayWithIncreasingValues = Array.from(Array(maxIndex).keys());
  const shuffledArray = shuffle(arrayWithIncreasingValues);
  const sliced = shuffledArray.slice(0, length);
  return sliced;
}