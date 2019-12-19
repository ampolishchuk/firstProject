import Blocks from '../../../lib/blocks'; 

export default class Input extends Blocks {
    constructor(options) {
        super()
        this.blockname = 'input'
        this.template = require(`./${this.blockname}.pug`)

        super.create(options)
    }
    setMask() {
        require("./jquery.maskedinput.js");
        this.object.mask('99.99.9999');
    }
}