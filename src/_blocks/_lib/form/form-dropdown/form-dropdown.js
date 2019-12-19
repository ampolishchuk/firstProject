export const formDropdown = {
    init(options = {}) {
        let objects = []
        document.querySelectorAll('.js_form-dropdown').forEach((formDropdown) => {
            options.object = formDropdown
            objects.push(new FormDropdown(options))
        })
        return objects
    }
}

class FormDropdown {
    constructor(options) {
        Object.assign(this, options)
        this.button = this.object.querySelector('.form-dropdown_button')
        this.body = this.object.querySelector('.form-dropdown_body'),

        this.updateBody()
        this.addEvents()
    }
    updateBody() {
        if(this.closed) this.close()
        else this.open()
    }
    addEvents() {
        let _this = this
        this.button.addEventListener('click', () => {
            if(_this.closed) _this.open()
            else _this.close()
        })
    }
    open() {
        this.closed = false
        this.body.classList.remove('form-dropdown_body_hidden')
    }
    close() {
        this.closed = true
        this.body.classList.add('form-dropdown_body_hidden')
    }
}