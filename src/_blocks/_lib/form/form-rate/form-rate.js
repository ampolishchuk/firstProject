import { Button } from "../../button/button"
import { Input } from "../input/input"


class FormRateButton extends Button {
    check() {
        this.node.classList.add('form-rate_button_checked')
    }
    uncheck() {
        this.node.classList.remove('form-rate_button_checked')
    }
}

export class FormRate {
    constructor(options) {
        Object.assign(this, options)

        this.inputs = {list: []}
        this.buttons = {list: []}
        
        this.node.querySelectorAll('.form-rate_input').forEach((node) => {
            this.inputs.list.push(new Input({node}))
        })
        this.node.querySelectorAll('.form-rate_button').forEach((node, key) => {
            let button = new FormRateButton({node})

            this.buttons.list.push(button)

            button.onClick(() => {
                this.updateRate.call(this.buttons, key)
                this.updateRate.call(this.inputs, key)
            })
        })

        this.updateRate.call(this.buttons, this.defaultRate ? this.defaultRate - 1 : 0)
        this.updateRate.call(this.inputs, this.defaultRate ? this.defaultRate - 1 : 0)
    }
    updateRate(selectedKey) {
        for(let key in this.list) {
            if(key <= selectedKey) this.list[key].check()
            else this.list[key].uncheck()
        }        
    }
}