export const getColumnAmount = (data: string) => {
  const regex = /section_(\d+)_col/.exec(data)
  return  Number(regex[1])
}

export const layoutNameToCmpName = (layoutName: string): string => {
  return (layoutName.substr(0, 1).toUpperCase() + layoutName.substr(1))
    .replace('_section', '')
}

export const prepareColumnToRow = (base: Object, columnAmount: Number): Object => {
  const sectionData = Array.isArray(base)
    ? base[0]
    : base

  if(!sectionData || !('acf_fc_layout' in sectionData)) {
    throw new Error('Allocated more columns than provided')
  }

  sectionData.cmpName = layoutNameToCmpName(sectionData.acf_fc_layout)
  sectionData.columnAmount = columnAmount

  return sectionData
}