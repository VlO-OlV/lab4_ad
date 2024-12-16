const { colorGraph } = require('./areaGenerator');

class Area {
  constructor (graph) {
    this.graph = graph.map((vertice) => { return vertice.slice(); });
    const coloredGraph = colorGraph(this.graph);
    this.coloring = coloredGraph[0];
    this.usedColors = coloredGraph[1];
    this.evaluation = [];
    this.lastSwap = [null, null];
  }

  evaluate () {
    this.evaluation = [];
    for (let color = 0; color < this.usedColors.length; color++) {
      const currentColorCount = this.coloring.filter((verticeColor) => verticeColor === this.usedColors[color]).length;
      if (currentColorCount === 0) {
        this.usedColors = this.usedColors.filter((usedColor) => usedColor !== this.usedColors[color]);
      } else {
        this.evaluation.push(currentColorCount);
      }
    }
    return this.evaluation;
  }
}

module.exports = { Area };