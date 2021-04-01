import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { crawlJson } from './crawler'

const STYLES = {
  ROOTCOLOR: '#a8b6dd',
  ARRAYCOLOR: '#6E6EFD',
  OBJECTCOLOR: '#fcfcab', //'#FFFF00'
  EMPTYCOLOR: '#FB7E81',
  LEAFCOLOR: '#C2FABC',
  ARRAYSHAPE: 'box',
  OBJECTSHAPE: 'circle',
  LEAFSHAPE: 'ellipse',
  ROOTFONT: { size: 25 }
}

const createGraph = (jsonStrRaw) => {
  const container = document.getElementById('app')

  let options = {}

  // if hierarchical selected, change options
  if (document.getElementById('hierarchychkbx').checked) {
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

    const showLeaves = document.getElementById('leaveschkbx').checked
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

const resetTextBox = () => {
  const sampleJSON = `{
    "cities": [
      { "name": "Helsinki", "country": "Finland" },
      { "name": "Berlin", "country": "Germany" },
      { "name": "Paris", "country": "France" }
    ],
    "pets": ["duck", "whale"]
  }`

  document.getElementById('jsonstr').value = sampleJSON
}

// define callback-functions for DOM-elements
document
  .getElementById('createbtn')
  .addEventListener('click', () =>
    createGraph(document.getElementById('jsonstr').value)
  )
document.getElementById('clearbtn').addEventListener('click', () => {
  document.getElementById('jsonstr').value = ''
  createGraph('')
})
document
  .getElementById('leaveschkbx')
  .addEventListener('change', () =>
    createGraph(document.getElementById('jsonstr').value)
  )
document
  .getElementById('hierarchychkbx')
  .addEventListener('change', () =>
    createGraph(document.getElementById('jsonstr').value)
  )

// initial graph
resetTextBox()
createGraph(document.getElementById('jsonstr').value)
