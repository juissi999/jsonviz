import renderGraph from './renderer'
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

const resetTextBox = () => {
  const sampleJSON = `{
    "cities": [
      { "name": "Helsinki", "country": "Finland", "employees": ["Heidi", "Mika"] },
      { "name": "Berlin", "country": "Germany", "employees":[] },
      { "name": "Paris", "country": "France", "employees":["Michelle"] }
    ],
    "pets": ["duck", "whale"],
    "cars": [
      {"Manufacturer":"Volkswagen", "stock":null, "available":false},
      {"Manufacturer":"Tesla", "stock":3,"available":true},
      {"Manufacturer":"Renault", "stock":2, "available":true}
    ]
  }`

  document.getElementById('jsonstr').value = sampleJSON
}

const refreshGraph = () => {
  // preprocess JSON in case it would use ' instead of "
  // jsonStrRaw = jsonStrRaw.replace(/\'/g, '"')

  try {
    // try to parse JSON, if it fails, catch it
    document.getElementById('statustxt').textContent = ''
    const jsonObj = JSON.parse(document.getElementById('jsonstr').value)

    // clean the JSON for textbox
    document.getElementById('jsonstr').value = JSON.stringify(jsonObj, null, 2)

    // crawl json
    const newNodes = []
    const newEdges = []
    crawlJson(
      jsonObj,
      null,
      null,
      newNodes,
      newEdges,
      0,
      document.getElementById('leavesselect').value,
      STYLES
    )

    // render graph
    renderGraph(
      document.getElementById('app'),
      newNodes,
      newEdges,
      document.getElementById('hierarchychkbx').checked
    )
  } catch (error) {
    // something went wrong, create empty graph
    document.getElementById('statustxt').textContent = `${error}`

    renderGraph(document.getElementById('app'), [], [], false)
  }
}

window.addEventListener('load', () => {
  // define callback-functions for DOM-elements
  document.getElementById('createbtn').addEventListener('click', refreshGraph)
  document.getElementById('clearbtn').addEventListener('click', () => {
    document.getElementById('jsonstr').value = ''
    document.getElementById('statustxt').textContent = ''
    renderGraph(document.getElementById('app'), [], [], false)
  })
  document
    .getElementById('leavesselect')
    .addEventListener('change', refreshGraph)
  document
    .getElementById('hierarchychkbx')
    .addEventListener('change', refreshGraph)

  // initial graph
  resetTextBox()
  refreshGraph()
})
