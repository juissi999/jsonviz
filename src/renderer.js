import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { crawlJson } from './crawler'

const renderGraph = (container, jsonObj, hierarchical, showLeaves, STYLES) => {
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

  const newNodes = []
  const newEdges = []
  crawlJson(jsonObj, null, null, newNodes, newEdges, 0, showLeaves, STYLES)

  // create an array for nodes
  const nodes = new DataSet(newNodes)

  // create an array for edges
  const edges = new DataSet(newEdges)

  // create a network

  const data = {
    nodes: nodes,
    edges: edges
  }

  // create graph
  new Network(container, data, options)
}

export default renderGraph
