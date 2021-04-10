import renderGraph from './renderer'
import { crawlJson } from './crawler'
import { helpNodes, helpEdges, sampleJSON } from './help'
import 'juicycss/index.css'
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

const createLayout = (elId) => {
  const app = document.getElementById(elId)
  const container = document.createElement('div')

  container.setAttribute('class', 'container')

  const title = document.createElement('h2')
  title.innerText = 'jsonviz'
  container.appendChild(title)

  const block1 = document.createElement('div')
  block1.setAttribute('class', 'my-2')
  block1.innerHTML =
    'Display JSON structure graphically. <span id="statustxt" class="error"></span>'
  container.appendChild(block1)

  const block2 = document.createElement('div')
  block2.setAttribute('class', 'my-2')
  block2.innerHTML = '<textarea id="jsonstr" rows="6"></textarea>'
  container.appendChild(block2)

  const block3 = document.createElement('div')
  block3.setAttribute('class', 'my-2')
  block3.innerHTML = `
    Leaf mode 
    <select name="leaves" id="leavesselect">
      <option value="hide">hide</option>
      <option value="show">show</option>
      <option value="value">show value</option>
    </select>`
  container.appendChild(block3)

  const block4 = document.createElement('div')
  block4.setAttribute('class', 'my-2')
  block4.innerHTML = `
    <input type="checkbox" id="hierarchychkbx">
    <label for="hierarchychkbx" class="nonselectable">Hierarchical</label>`
  container.appendChild(block4)

  const block5 = document.createElement('div')
  block5.setAttribute('class', 'my-2')

  block5.appendChild(createButton('Create graph', '', refreshGraph))
  block5.appendChild(
    createButton('Clear textbox', 'yellow', () => {
      document.getElementById('jsonstr').value = ''
      document.getElementById('statustxt').textContent = ''
      renderGraph(document.getElementById('graph'), [], [], false)
    })
  )
  block5.appendChild(
    createButton('Help', 'green', () => {
      renderGraph(
        document.getElementById('graph'),
        helpNodes(STYLES),
        helpEdges(STYLES),
        false
      )
    })
  )
  container.appendChild(block5)

  const graph = document.createElement('div')
  graph.setAttribute('class', 'my-2')
  graph.setAttribute('id', 'graph')
  container.appendChild(graph)

  const block6 = document.createElement('div')
  block6.setAttribute('class', 'my-2')
  block6.innerHTML = `<a href="https://github.com/juissi999/jsonviz">juissi999@github</a>`
  container.appendChild(block6)

  app.appendChild(container)
}

const createButton = (txt, classes, callback) => {
  const btn = document.createElement('button')
  btn.appendChild(document.createTextNode(txt))
  btn.addEventListener('click', callback)
  btn.setAttribute('class', 'mr-1 my-1 mw-2 pointer ' + classes)
  return btn
}
