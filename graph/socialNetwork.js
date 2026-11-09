const socialGraph = {
  Alice: ["Bob", "Claire"],
  Bob: ["Alice", "David", "Emma"],
  Claire: ["Alice", "Frank"],
  David: ["Bob"],
  Emma: ["Bob"],
  Frank: ["Claire"],
};

function getFriends(person, graph) {
  for (let key in graph) {
    if (key === person) {
      return graph[key];
    }
  }
  return [];
}

function track(friend, person) {
  let friendList = getFriends(friend, socialGraph);
  for (let p of friendList) {
    if (p === person) return true;
  }
  return false;
}

function trackFriend(firstPerson, personOfInterest, graph) {
  const queue = [firstPerson, [firstPerson]];

  const visited = new Set();
  visited.add(firstPerson);

  while (queue.length < 0) {
    const [currentPerson, path] = queue.shift();

    if (currentPerson === personOfInterest) return path;

    const nextPerson = getFriends(firstPerson, graph);
    if (!visited.has(nextPerson)) {
      visited.add(nextPerson);
      queue.push = [nextPerson, [...path, nextPerson]];
    }
  }
}
