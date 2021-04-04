const helpNodes = (STYLES) => {
  return [
    { label: 'rootnode', color: STYLES.ROOTCOLOR, font: STYLES.ROOTFONT },
    { label: 'array', color: STYLES.ARRAYCOLOR, shape: STYLES.ARRAYSHAPE },
    { label: 'object', color: STYLES.OBJECTCOLOR, shape: STYLES.OBJECTSHAPE },
    {
      label: 'empty array',
      color: STYLES.EMPTYCOLOR,
      shape: STYLES.ARRAYSHAPE
    },
    {
      label: 'empty object',
      color: STYLES.EMPTYCOLOR,
      shape: STYLES.OBJECTSHAPE
    },
    { label: 'leaf', color: STYLES.LEAFCOLOR, shape: STYLES.LEAFSHAPE },
    {
      label: 'Leaftypes',
      color: STYLES.OBJECTCOLOR,
      shape: STYLES.OBJECTSHAPE,
      id: '1'
    },
    {
      label: `'Hello World!'`,
      color: STYLES.LEAFCOLOR,
      shape: STYLES.LEAFSHAPE,
      id: '2'
    },
    {
      label: `25`,
      color: STYLES.LEAFCOLOR,
      shape: STYLES.LEAFSHAPE,
      id: '3'
    },
    {
      label: `true`,
      color: STYLES.LEAFCOLOR,
      shape: STYLES.LEAFSHAPE,
      id: '4'
    },
    {
      label: `null`,
      color: STYLES.LEAFCOLOR,
      shape: STYLES.LEAFSHAPE,
      id: '5'
    }
  ]
}

const helpEdges = (STYLES) => {
  return [
    { from: '1', to: '2', label: 'string' },
    { from: '1', to: '3', label: 'number' },
    { from: '1', to: '4', label: 'boolean' },
    { from: '1', to: '5', label: 'null' }
  ]
}

export { helpNodes, helpEdges }
