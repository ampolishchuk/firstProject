export class Button {
    constructor(options) {
        Object.assign(this, options)
        this.addEvents()
    }
    addEvents() {
        this.node.addEventListener('click', () => {
            this.onClick()
        })
    }
    onClick() {
        console.log('onClick:')
        console.log(this.node)
    }
}