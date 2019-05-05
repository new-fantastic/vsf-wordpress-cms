export const getColumnAmountAndPrefix = (data: object) => {
    const key = Object.keys(data).filter(v => v != "acf_fc_layout")
    if(key.length < 1) {
        throw new Error('There is not layout object in given data')
        return
    }

    const regex = /wp_(\d+)_col_layout/.exec(key[0])
            
    if (regex === null || regex.length < 2) {
        throw new Error('Given data has badly named key for layout configuration')
        return
    }

    return {
        columns: Number(regex[1]),
        prefix: regex[0] + '_'
    }
}

export const layoutNameToCmpName = (layoutName: string): string => {
    return layoutName
        .replace("wp", "")
        .replace(/(\_\w)/g, function(k) {
            return k[1].toUpperCase();
        })
}

export const prepareColumnToRow = (base: Object, columnAmount: Number): Object => {
    const sectionData = Array.isArray(base)
        ? base[0]
        : base

    sectionData.cmpName = layoutNameToCmpName(sectionData.acf_fc_layout)
    sectionData.columnAmount = columnAmount

    return sectionData
}