function generateGraph(numberOfVertices, maxDegree) {
  let graph = [];
  for (let i = 0; i < numberOfVertices; i++) {
    graph.push([]);
  }

  for (let currentVertice = 0; currentVertice < graph.length; currentVertice++) {
    let availableNeighbors = Array.from(Array(graph.length).keys()).filter((neighbor) => neighbor !== currentVertice);
    const currentDegree = Math.floor(Math.random() * maxDegree) + 1;
    for (let i = graph[currentVertice].length; i < currentDegree; i++) {
      const neighbor = availableNeighbors[Math.floor(Math.random() * availableNeighbors.length)];
      availableNeighbors = availableNeighbors.filter((currentNeighbor) => currentNeighbor !== neighbor);
      if (graph[neighbor].length < maxDegree && graph[currentVertice].indexOf(neighbor) === -1) {
        graph[currentVertice].push(neighbor);
        graph[neighbor].push(currentVertice);
      }
    }
  }

  return graph;
}

function colorVerticesByDegree(graph, colors, coloring, usedColors, vertices) {
  let currentColoring = [...coloring];
  const currentUsedColors = [...usedColors];

  while (vertices.length > 0) {
    const currentVertice = vertices[Math.floor(Math.random() * vertices.length)];

    let currentColor = 0;
    while (currentColoring[currentVertice] === null && currentColor < currentUsedColors.length) {
      let conflicts = false;
      let currentNeighbor = 0;
      while (!conflicts && currentNeighbor < graph[currentVertice].length) {
        if (currentColoring[graph[currentVertice][currentNeighbor]] === currentUsedColors[currentColor]) {
          conflicts = true;
        }
        currentNeighbor++;
      }

      if (!conflicts) {
        currentColoring[currentVertice] = currentUsedColors[currentColor];
        vertices = vertices.filter((vertice) => vertice !== currentVertice);
      }
      currentColor++;
    }

    if (currentColoring[currentVertice] === null) {
      currentUsedColors.push(colors[currentUsedColors.length]);
      currentColoring[currentVertice] = currentUsedColors[currentUsedColors.length - 1];
      vertices = vertices.filter((vertice) => vertice !== currentVertice);
    }
  }
  
  return [currentColoring, currentUsedColors];
}

function colorGraph(graph, colors = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']) {
  const degrees = graph.map((neighbors, index) => ([index, neighbors.length]));
  let coloring = [];
  for (let i = 0; i < graph.length; i++) {
    coloring.push(null);
  }
  let usedColors = [];

  const maxDegree = Math.max(...degrees.map((degree) => (degree[1])));
  const minDegree = Math.min(...degrees.map((degree) => (degree[1])));

  for (let i = maxDegree; i >= minDegree; i--) {
    let vertices = degrees.filter((degree) => degree[1] === i).map((degree) => (degree[0]));
    [coloring, usedColors] = colorVerticesByDegree(graph, colors, coloring, usedColors, vertices);
  }

  coloring[Math.floor(Math.random() * coloring.length)] = colors[usedColors.length];
  usedColors.push(colors[usedColors.length]);

  return [coloring, usedColors];
}

module.exports = { generateGraph, colorGraph };