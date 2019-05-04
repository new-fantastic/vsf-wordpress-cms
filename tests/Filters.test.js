import { getColumnAmountAndPrefix } from '../util/Filters.ts'
const expect = require('chai').expect;

describe('Filters', () => {

    it('it gets column amount and prefix from given data', () => {
        expect(getColumnAmountAndPrefix()).to.deep.equal({
            columns: 3,
            prefix: 'wp_3_col_layout_'
        })
    })
})