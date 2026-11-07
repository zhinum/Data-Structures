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

function trackFriend(personOfInterest) {
  let startCount = 0;
  const startPerson = Object.keys(socialGraph[startCount]);
  const queue = [startPerson];
  const visited = new Set();
  visited.add(startPerson.toString());

  while (queue.length > 0) {
    const currentPerson = queue.shift();

    if (track(currentPerson, personOfInterest)) return "found";
    if (currentPerson === personOfInterest) return "found";
    let nextperson = Object.keys(socialGraph[startCount++]);
    if (nextperson === undefined) {
      // incase it pushes past the limit
      return "friend not found";
    }
    if (!visited.has(nextperson.toString())) {
      visited.add(nextperson.toString());
      queue.push(nextperson);
    }
  }
  startCount = 0; // return back to 0 if friend not found
  return "friend not found";
}
