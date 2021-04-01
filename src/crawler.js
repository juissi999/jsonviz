import { v4 } from 'uuid'

const ROOTCOLOR = '#a8b6dd'
const ARRAYCOLOR = '#6E6EFD'
const OBJECTCOLOR = '#fcfcab'
const EMPTYCOLOR = '#FB7E81'
const LEAFCOLOR = '#C2FABC'

const ARRAYSHAPE = 'box'
const OBJECTSHAPE = 'circle'
const LEAFSHAPE = 'ellipse'

const ROOTFONT = { size: 25 }

const crawlJson = (
  jsonObj,
  parentId,
  label,
  newNodes,
  newEdges,
  level,
  showLeaves
) => {
  // recursive crawling function that goes through JSON

  const isArray = Array.isArray(jsonObj)
  const isObj = isObject(jsonObj)
  const nodeId = v4()

  // edge to parent when not root element
  if (parentId) {
    newEdges.push({ from: parentId, to: nodeId, arrows: 'to', label })
  }

  // process different node-types of JSON
  if (isArray) {
    let color = ARRAYCOLOR
    if (jsonObj.length === 0) {
      color = EMPTYCOLOR
    }

    newNodes.push({
      id: nodeId,
      level,
      label: 'Array',
      shape: ARRAYSHAPE,
      color: parentId ? color : ROOTCOLOR,
      font: parentId ? undefined : ROOTFONT
    })
    jsonObj.map((item) =>
      crawlJson(item, nodeId, null, newNodes, newEdges, level + 1, showLeaves)
    )
  } else if (isObj) {
    let color = OBJECTCOLOR //'#FFFF00'
    if (Object.keys(jsonObj).length === 0) {
      color = EMPTYCOLOR
    }

    newNodes.push({
      id: nodeId,
      level,
      label: 'Object',
      color: parentId ? color : ROOTCOLOR,
      font: parentId ? undefined : ROOTFONT,
      shape: OBJECTSHAPE
    })
    const keys = Object.keys(jsonObj)
    keys.map((key) =>
      crawlJson(
        jsonObj[key],
        nodeId,
        key,
        newNodes,
        newEdges,
        level + 1,
        showLeaves
      )
    )
  } else {
    if (showLeaves) {
      newNodes.push({
        id: nodeId,
        level,
        color: LEAFCOLOR,
        shape: LEAFSHAPE,
        font: parentId ? undefined : ROOTFONT,
        label: jsonObj.toString()
      })
    }
  }
}

const isObject = (obj) => {
  // test if object is an object and not e.g. array, return bool
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export { crawlJson }
