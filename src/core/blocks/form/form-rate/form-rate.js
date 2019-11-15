export default function formRate() {
    console.log('form-rate')

    window.formRate_title_setStars = function(formRate_title) {
        let formRate_label = formRate_title.parentElement
        let formRate_input = formRate_label.querySelector('.form-rate_input')  

        let formRate = formRate_label.parentElement 
        let formRate_inputs = formRate.querySelectorAll('.form-rate_input')

        formRate_inputs.forEach(function(formRate_input) {
            formRate_input.removeAttribute('checked')
            formRate_input.classList.remove('form-rate_input_checked')
        })

        formRate_input.setAttribute('checked', 'checked')

        for(let i = 0; i < formRate_inputs.length; i++) {
            let formRate_input = formRate_inputs[i]
            
            if(!formRate_input.getAttribute('checked')) {
                formRate_input.classList.add('form-rate_input_checked')
            } else break
        }
    }

    let formRates = document.querySelectorAll('.form-rate')
    formRates.forEach(function(formRate) {
        let formRate_title = formRate.querySelector('.form-rate_input:checked + .form-rate_title')
        if(formRate_title) formRate_title_setStars(formRate_title)
    })

    return this
}

