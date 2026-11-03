function knightMoves(start, end) {
  const getKnightMoves = (x, y) => {
    const movesArr = [];
    const possibleMoves = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];

    for (let move of possibleMoves) {
      let newX = x + move[0];
      let newY = y + move[1];

      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        movesArr.push(move);
      }
    }
    return movesArr;
  };

  const queue = [[start], [[start]]];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [currentPos, path] = queue.shift();
    const [currX, currY] = currentPos;
    if (currX === end[0] && currY === end[1]) return path;

    for (let nextMove of getKnightMoves(currX, currY)) {
      const nextMoveKey = nextMove.toString();

      if (!visited.has(nextMoveKey)) {
        visited.add(nextMoveKey);
        queue.push([nextMove], [...path, nextMove]);
      }
    }
  }
}
