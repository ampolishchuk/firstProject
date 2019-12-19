export const formRate = {
    init(formRateClass) {
        document.querySelectorAll(formRateClass).forEach((formRate) => {
            new FormRate(formRate)            
        })
    }
}

class FormRate {
    constructor(object) {
        this.object = object
        this.inputs = this.object.querySelectorAll('.form-rate_input')

        this.checked = {input: this.object.querySelector('.form-rate_input:checked')}
        if(!this.checked.input) this.checked.input = this.object.querySelector('.form-rate_input')   
        
        this.addEvents()
        this.updateStars()
    }
    updateStars() {
        this.updateCheckedData()
        this.clearStars()
        this.setStars()        
    }
    setStars() {
        for(let i = 0; i < this.inputs.length; i++) {            
            if(this.checked.input == this.inputs[i]) {                        
                this.checked.input.setAttribute('checked', 'checked')
                this.checked.input.checked = true
                this.checked.input.classList.add('form-rate_input_checked')
                break
            }
            else this.inputs[i].classList.add('form-rate_input_checked')
        }
    }
    clearStars() {
        this.inputs.forEach((input) => {
            input.removeAttribute('checked')
            input.checked = false
            input.classList.remove('form-rate_input_checked')
        })
    }
    updateCheckedData() {
        this.checked = {
            ...this.checked,
            label: this.checked.input.parentElement,
            title: this.checked.input.nextSibling
        }     
    }
    addEvents() {
        let _this = this
        this.inputs.forEach((input) => input.addEventListener('click', () => {
            _this.checked.input = input
            _this.updateStars()
        }))
    }
}