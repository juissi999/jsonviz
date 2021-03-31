import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { v4 } from 'uuid'

const onCreateClick = () => {
  const newNodes = []
  const newEdges = []

  let myJsonRaw = document.getElementById('jsonstr').value
  myJsonRaw = myJsonRaw.replace(/\'/g, '"')
  const myJson = JSON.parse(myJsonRaw)

  crawlJson(myJson, null, null, newNodes, newEdges)

  // create an array for nodes
  const nodes = new DataSet(newNodes)

  // create an array for edges
  const edges = new DataSet(newEdges)

  // create a network
  const container = document.getElementById('app')
  const data = {
    nodes: nodes,
    edges: edges
  }
  const options = {}

  new Network(container, data, options)
}

const crawlJson = (jsonObj, parentId, label, newNodes, newEdges) => {
  const isArray = Array.isArray(jsonObj)
  const isObj = isObject(jsonObj)

  const nodeId = v4()

  if (parentId) {
    newEdges.push({ from: parentId, to: nodeId, arrows: 'to', label })
  }

  if (isArray) {
    let color = '#6E6EFD'
    if (jsonObj.length === 0) {
      color = '#FB7E81'
    }

    newNodes.push({
      id: nodeId,
      label: 'Array',
      shape: 'box',
      color: parentId ? color : '#C2FABC',
      heightConstraint: parentId ? undefined : { minimum: 100 },
      widthConstraint: parentId ? undefined : { minimum: 100 }
    })
    jsonObj.map((item) => crawlJson(item, nodeId, null, newNodes, newEdges))
  } else if (isObj) {
    let color = '#fcfcab' //'#FFFF00'
    if (Object.keys(jsonObj).length === 0) {
      color = '#FB7E81'
    }

    newNodes.push({
      id: nodeId,
      label: 'Object',
      color: parentId ? color : '#C2FABC',
      shape: 'circle'
    })
    const keys = Object.keys(jsonObj)
    keys.map((key) => crawlJson(jsonObj[key], nodeId, key, newNodes, newEdges))
  } else {
    newNodes.push({ id: nodeId, shape: 'diamond', label: jsonObj })
  }
}

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const resetTextBox = () => {
  const sampleJSON = `{
    'cities': [
      { 'name': 'Helsinki', 'country': 'Finland' },
      { 'name': 'Berlin', 'country': 'Germany' },
      { 'name': 'Paris', 'country': 'France' }
    ],
    'pets': ['duck', 'whale']
  }`

  document.getElementById('jsonstr').value = sampleJSON
}

resetTextBox()
document.getElementById('createbtn').addEventListener('click', onCreateClick)
