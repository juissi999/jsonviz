import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { crawlJson } from './crawler'

const renderGraph = (
  container,
  jsonStrRaw,
  hierarchical,
  showLeaves,
  STYLES
) => {
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

  // preprocess JSON in case it would use ' instead of "
  // jsonStrRaw = jsonStrRaw.replace(/\'/g, '"')

  try {
    // try to parse JSON, if it fails, catch it
    const myJson = JSON.parse(jsonStrRaw)

    const newNodes = []
    const newEdges = []
    crawlJson(myJson, null, null, newNodes, newEdges, 0, showLeaves, STYLES)

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
  } catch (error) {
    // something went wrong, create empty graph
    console.log(error)

    new Network(
      container,
      {
        nodes: [],
        edges: []
      },
      options
    )
  }
}

export default renderGraph
