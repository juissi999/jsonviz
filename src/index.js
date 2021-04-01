import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { v4 } from 'uuid'

const createGraph = (jsonStrRaw) => {
  const container = document.getElementById('app')

  let options = {}
  const newNodes = []
  const newEdges = []

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

    crawlJson(myJson, null, null, newNodes, newEdges, 0)

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
    // create empty graph
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

const crawlJson = (jsonObj, parentId, label, newNodes, newEdges, level) => {
  // recursive crawling function that goes through JSON

  const showLeaves = document.getElementById('leaveschkbx').checked

  const isArray = Array.isArray(jsonObj)
  const isObj = isObject(jsonObj)

  const nodeId = v4()

  // edge to parent when not root element
  if (parentId) {
    newEdges.push({ from: parentId, to: nodeId, arrows: 'to', label })
  }

  // process different node-types of JSON
  if (isArray) {
    let color = '#6E6EFD'
    if (jsonObj.length === 0) {
      color = '#FB7E81'
    }

    newNodes.push({
      id: nodeId,
      level,
      label: 'Array',
      shape: 'box',
      color: parentId ? color : '#C2FABC',
      heightConstraint: parentId ? undefined : { minimum: 100 },
      widthConstraint: parentId ? undefined : { minimum: 100 }
    })
    jsonObj.map((item) =>
      crawlJson(item, nodeId, null, newNodes, newEdges, level + 1)
    )
  } else if (isObj) {
    let color = '#fcfcab' //'#FFFF00'
    if (Object.keys(jsonObj).length === 0) {
      color = '#FB7E81'
    }

    newNodes.push({
      id: nodeId,
      level,
      label: 'Object',
      color: parentId ? color : '#C2FABC',
      shape: 'circle'
    })
    const keys = Object.keys(jsonObj)
    keys.map((key) =>
      crawlJson(jsonObj[key], nodeId, key, newNodes, newEdges, level + 1)
    )
  } else {
    if (showLeaves) {
      newNodes.push({
        id: nodeId,
        level,
        shape: 'diamond',
        label: jsonObj.toString()
      })
    }
  }
}

const isObject = (obj) => {
  // test if object is an object and not e.g. array, return bool
  return Object.prototype.toString.call(obj) === '[object Object]'
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
