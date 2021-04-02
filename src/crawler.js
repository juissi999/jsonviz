import { v4 } from 'uuid'

const crawlJson = (
  jsonObj,
  parentId,
  label,
  newNodes,
  newEdges,
  level,
  showLeaves,
  styles
) => {
  // recursive crawling function that goes through JSON

  const isArray = Array.isArray(jsonObj)
  const isObj = isObject(jsonObj)
  const nodeId = v4()

  // edge to parent when not root element
  if (parentId) {
    newEdges.push({ from: parentId, to: nodeId, arrows: 'to', label })
  }

  const newNode = {
    id: nodeId,
    level,
    font: parentId ? undefined : styles.ROOTFONT
  }

  // process different node-types of JSON
  if (isArray) {
    let color = styles.ARRAYCOLOR
    if (jsonObj.length === 0) {
      color = styles.EMPTYCOLOR
    }

    newNodes.push({
      ...newNode,
      label: 'Array',
      shape: styles.ARRAYSHAPE,
      color: parentId ? color : styles.ROOTCOLOR
    })
    jsonObj.map((item) =>
      crawlJson(
        item,
        nodeId,
        null,
        newNodes,
        newEdges,
        level + 1,
        showLeaves,
        styles
      )
    )
  } else if (isObj) {
    let color = styles.OBJECTCOLOR
    if (Object.keys(jsonObj).length === 0) {
      color = styles.EMPTYCOLOR
    }

    newNodes.push({
      ...newNode,
      label: 'Object',
      color: parentId ? color : styles.ROOTCOLOR,
      shape: styles.OBJECTSHAPE
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
        showLeaves,
        styles
      )
    )
  } else {
    if (showLeaves) {
      newNodes.push({
        ...newNode,
        color: styles.LEAFCOLOR,
        shape: styles.LEAFSHAPE,
        label: styles.LEAFLABEL ? jsonObj.toString() : undefined
      })
    }
  }
}

const isObject = (obj) => {
  // test if object is an object and not e.g. array, return bool
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export { crawlJson }
