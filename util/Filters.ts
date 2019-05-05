export const getColumnAmountAndPrefix = (data: object) => {
    const key = Object.keys(data).filter(v => v != "acf_fc_layout")
    if(key.length < 1) {
        return
    }

    const regex = /wp_(\d+)_col_layout/.exec(key[0])
            
    if (regex === null || regex.length < 2) {
        return
    }

    return {
        columns: Number(regex[1]),
        prefix: regex[0] + '_'
    }
}