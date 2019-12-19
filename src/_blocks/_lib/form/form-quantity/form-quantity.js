export const formQuantity = {
    init(options = {}) {
        let objects = []
        document.querySelectorAll('.js_form-quantity').forEach((formQuantity) => {
            options.object = formQuantity
            objects.push(new FormQuantity(options))
        })
        return objects
    }
}

class FormQuantity {
    constructor(options) {
        Object.assign(this, options)
        this.minValue = this.minValue || 0
        this.maxValue = this.maxValue || Infinity

        this.initElements()
        this.initControls()
        this.initTitle()  

        this.addEvents()
    }
    addEvents() {
        this.addElementsEvents()
        if(this.controls.object) this.addControlsEvents()
    }
    initElements() {
        this.elements = []

        this.object.querySelectorAll('.form-quantity_element').forEach((elementObject) => {
            let element = {
                object: elementObject,
                title: elementObject.textContent,
                input: elementObject.querySelector('.form-quantity_input'),
                buttons: {
                    remove: elementObject.querySelector('.form-quantity_button_remove'),
                    add: elementObject.querySelector('.form-quantity_button_add')
                }
            }
            this.elements.push(element)
        })
    }
    addElementsEvents() {
        let _this = this
        this.elements.forEach((element) => {
            element.buttons.remove.addEventListener('click', () => {
                element.input.value = element.input.value > _this.minValue?--element.input.value:_this.minValue
                _this.updateTitle()
                _this.updateControlsClearButton()
            })
            element.buttons.add.addEventListener('click', () => {
                element.input.value = element.input.value < _this.maxValue?++element.input.value:_this.maxValue
                _this.updateTitle()
                _this.updateControlsClearButton()
            })
            element.input.addEventListener('change', () => {
                element.input.value = element.input.value > _this.minValue?--element.input.value:_this.minValue
                element.input.value = element.input.value < _this.maxValue?++element.input.value:_this.maxValue
                _this.updateTitle()
                _this.updateControlsClearButton()
            })
        })
    }
    initControls() {
        this.controls = {object: this.object.querySelector('.form-quantity_controls')}
        if(this.controls.object) {
            this.controls.buttons = {
                clear: this.controls.object.querySelector('.form-quantity_button_clear'),
                confirm: this.controls.object.querySelector('.form-quantity_button_confirm')
            }
            this.updateControlsClearButton()
        }
    }
    updateControlsClearButton() {
        if(this.controls.object) {
            let hasFilledElements = this.elements.some((element) => element.input.value != 0)
            
            if(!hasFilledElements) this.controls.buttons.clear.classList.add('form-quantity_button_hidden')
            else this.controls.buttons.clear.classList.remove('form-quantity_button_hidden')
        }
    }
    addControlsEvents() {
        let _this = this
        this.controls.buttons.clear.addEventListener('click', () => {
            _this.elements.forEach((element) => element.input.value = 0)
            _this.initElements()
            _this.initControls()
            _this.initTitle()
        })
    }
    initTitle(title = this.title) {
        if(title) {
            this.title = {
                object: document.querySelector(title.class),
                type: 'separated',
                ...title,
            }
            this.title.default = this.title.default || this.getTitle()
            this.updateTitle()
        }
    }
    updateTitle() {
        if(this.title) {
            this.title.value = this.generateTitle()
            this.setTitle()
        }
    }
    setTitle() {
        if(this.title.object.nodeName === 'INPUT') this.title.object.value = this.title.value
        else this.title.object.innerHTML = this.title.value
    }
    getTitle() {
        if(this.title.object.nodeName === 'INPUT') return this.title.object.value
        else return this.title.object.textContent
    }
    generateTitle() {
        let title = ''
        let _this = this

        this.elements.forEach((element) => {
            if(_this.title.type === 'separated') {
                let letterSpace = 10.5  // approximate letter space
                let titleLetters = element.input.value.length + element.title.length 
                let titleLettersCapacity = _this.title.object.offsetWidth / letterSpace

                if((title.length + titleLetters) <= titleLettersCapacity) {
                    if(element.input.value !== '0') {
                        if(title) title += ', '
                        title += element.input.value + ' ' + element.title.toLowerCase()
                    }
                } else {
                    title += '...'
                }
            } else {
                title = title || 0
                title += parseInt(element.input.value)
            }
        })

        if(this.title.type === 'summury' && title) title = title + ' ' + this.getDeclension(title, this.title.declensions)

        return title || _this.title.default
    }
    getDeclension(num, expressions) {
        let result;
        let count = num % 100;
        if (count >= 5 && count <= 20) {
            result = expressions[2];
        } else {
            count = count % 10;
            if (count == 1) {
                result = expressions[0];
            } else if (count >= 2 && count <= 4) {
                result = expressions[1];
            } else {
                result = expressions[2];
            }
        }
        return result;
    }

}