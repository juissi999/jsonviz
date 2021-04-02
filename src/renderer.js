import { Network } from 'vis-network'
import { DataSet } from 'vis-data'

const renderGraph = (container, newNodes, newEdges, hierarchical) => {
  let options = {}

  // if hierarchical selected, change options
  if (hierarchical) {
    options = {
      layout: {
        hierarchical: {
          direction: 'UD'
        }
      }
    }
  }

  // create an array for nodes
  const nodes = new DataSet(newNodes)

  // create an array for edges
  const edges = new DataSet(newEdges)

  // create a network
  const data = {
    nodes: nodes,
    edges: edges
  }

  new Network(container, data, options)
}

export default renderGraph
