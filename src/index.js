import renderGraph from './renderer'

const STYLES = {
  ROOTCOLOR: '#a8b6dd',
  ARRAYCOLOR: '#6E6EFD',
  OBJECTCOLOR: '#fcfcab', //'#FFFF00'
  EMPTYCOLOR: '#FB7E81',
  LEAFCOLOR: '#C2FABC',
  ARRAYSHAPE: 'box',
  OBJECTSHAPE: 'circle',
  LEAFSHAPE: 'ellipse',
  LEAFLABEL: true,
  ROOTFONT: { size: 25 }
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

const refreshGraph = () =>
  renderGraph(
    document.getElementById('app'),
    document.getElementById('jsonstr').value,
    document.getElementById('hierarchychkbx').checked,
    document.getElementById('leaveschkbx').checked,
    STYLES
  )

// define callback-functions for DOM-elements
document.getElementById('createbtn').addEventListener('click', refreshGraph)
document.getElementById('clearbtn').addEventListener('click', () => {
  document.getElementById('jsonstr').value = ''
  renderGraph('')
})
document.getElementById('leaveschkbx').addEventListener('change', refreshGraph)
document
  .getElementById('hierarchychkbx')
  .addEventListener('change', refreshGraph)

// initial graph
resetTextBox()
refreshGraph()
