import { getColumnAmountAndPrefix } from '../util/Filters.ts'
const expect = require('chai').expect;

describe('Filters', () => {

    it('it gets column amount and prefix from given data', () => {
        const dataMock = {
            "acf_fc_layout": null,
            "wp_3_col_layout_content": []
        }

        expect(getColumnAmountAndPrefix(dataMock)).to.deep.equal({
            columns: 3,
            prefix: 'wp_3_col_layout_'
        })
    })
})