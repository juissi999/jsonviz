import renderGraph from './renderer'
import { crawlJson } from './crawler'
import { helpNodes, helpEdges } from './help'
import './style.css'

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

const APPID = 'app'

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
      document.getElementById('graph'),
      newNodes,
      newEdges,
      document.getElementById('hierarchychkbx').checked
    )
  } catch (error) {
    // something went wrong, create empty graph
    document.getElementById('statustxt').textContent = `${error}`

    renderGraph(document.getElementById('graph'), [], [], false)
  }
}

window.addEventListener('load', () => {
  // define callback-functions for DOM-elements
  createLayout(APPID)
  document.getElementById('createbtn').addEventListener('click', refreshGraph)
  document.getElementById('clearbtn').addEventListener('click', () => {
    document.getElementById('jsonstr').value = ''
    document.getElementById('statustxt').textContent = ''
    renderGraph(document.getElementById('graph'), [], [], false)
  })
  document
    .getElementById('leavesselect')
    .addEventListener('change', refreshGraph)
  document
    .getElementById('hierarchychkbx')
    .addEventListener('change', refreshGraph)
  document.getElementById('helpbtn').addEventListener('click', () => {
    renderGraph(
      document.getElementById('graph'),
      helpNodes(STYLES),
      helpEdges(STYLES),
      false
    )
  })

  // initial graph
  resetTextBox()
  refreshGraph()
})

const createLayout = (elId) => {
  const app = document.getElementById(elId)
  const container = document.createElement('div')

  container.setAttribute('class', 'container')

  const title = document.createElement('h2')
  title.innerText = 'jsonviz'
  container.appendChild(title)

  const block1 = document.createElement('div')
  block1.setAttribute('class', 'block')
  block1.innerHTML =
    'Display JSON structure graphically. <span id="statustxt" class="error"></span>'
  container.appendChild(block1)

  const block2 = document.createElement('div')
  block2.setAttribute('class', 'block')
  block2.innerHTML = '<textarea id="jsonstr" rows="6"></textarea>'
  container.appendChild(block2)

  const block3 = document.createElement('div')
  block3.setAttribute('class', 'block')
  block3.innerHTML = `
    Leaf mode 
    <select name="leaves" id="leavesselect">
      <option value="hide">hide</option>
      <option value="show">show</option>
      <option value="value">show value</option>
    </select>`
  container.appendChild(block3)

  const block4 = document.createElement('div')
  block4.setAttribute('class', 'block')
  block4.innerHTML = `
    <input type="checkbox" id="hierarchychkbx">
    <label for="hierarchychkbx">Hierarchical</label>`
  container.appendChild(block4)

  const block5 = document.createElement('div')
  block5.setAttribute('class', 'block')
  block5.innerHTML = `
      <button id="createbtn">Create graph</button>
      <button id="clearbtn">Clear textbox</button>
      <button id="helpbtn">Help</button>`
  container.appendChild(block5)

  const graph = document.createElement('div')
  graph.setAttribute('class', 'block')
  graph.setAttribute('id', 'graph')
  container.appendChild(graph)

  const block6 = document.createElement('div')
  block6.setAttribute('class', 'block')
  block6.innerHTML = `<a href="https://github.com/juissi999/jsonviz">juissi999@github</a>`
  container.appendChild(block6)

  app.appendChild(container)
}
