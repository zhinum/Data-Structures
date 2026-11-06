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
