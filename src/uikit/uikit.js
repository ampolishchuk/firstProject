import './uikit.sass'

import {
    form
} from '../_blocks/blocks'


document.querySelectorAll('.form-input').forEach((formInput) => {
    formInput = new form.FormInput({
        node: formInput
    })
    if(formInput.node.querySelector('.form-input_maskDate')) 
        formInput.input.setMask('99.99.9999')
})

document.querySelectorAll('.form-dropdown').forEach((formDropdown) => {
    formDropdown = new form.FormDropdown({
        node: formDropdown
    })

    if(
        formDropdown.node.classList.contains('form-dropdown_rooms') ||
        formDropdown.node.classList.contains('form-dropdown_guests') ||
        formDropdown.node.classList.contains('form-dropdown_guests_filled')
    )
        formDropdown.open()
})

document.querySelectorAll('.form-quantity').forEach((formQuantity) => {
    formQuantity = new form.FormQuantity({
        node: formQuantity
    })
    if(formQuantity.node.classList.contains('form-quantity_rooms_closed')) {
        formQuantity.initTitle({
            node: document.querySelector('.form-dropdown_rooms_closed .form-dropdown_input')
        })
    }
    if(formQuantity.node.classList.contains('form-quantity_rooms')) {
        formQuantity.initTitle({
            node: document.querySelector('.form-dropdown_rooms .form-dropdown_input')
        })
    }
    if(formQuantity.node.classList.contains('form-quantity_guests')) {
        formQuantity.initTitle({
            node: document.querySelector('.form-dropdown_guests .form-dropdown_input')
        })
    }
    if(formQuantity.node.classList.contains('form-quantity_guests_filled')) {
        formQuantity.initTitle({
            node: document.querySelector('.form-dropdown_guests_filled .form-dropdown_input'),
            type: 'summury',
            declensions: ['гость', 'гостя', 'гостей']
        })
    }
})

var blocks = {    
    formRate: form.formRate.init('.js_form-rate'),
    formSlider: form.formSlider.init('.js_form-slider'),
    formPagination: form.formPagination.init({
        currentPage: 1,
        pagesAmount: 15,
        pageContent: 12,
        allContent: 160
    })
}