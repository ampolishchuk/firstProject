export class Title {
    constructor(options) {
        Object.assign(this, options)
        
        this.text = this.node.querySelector('.title-text')
        this.subtext = this.node.querySelector('.title-subtext')
    }
    setText(newText = this.text) {
        this.text = newText
        this.node.innerHTML = this.text
    }
    setSubtext(newSubtext = this.subtext) {
        this.subtext = newSubtext
        this.node.innerHTML = this.subtext
    }
}