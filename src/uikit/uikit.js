import './uikit.sass'

import {
    form,
    Dropdown,
    Slider
} from '../_blocks/blocks'



document.querySelectorAll('.form-input').forEach((formInput) => {
    formInput = new form.FormInput({
        node: formInput
    })
    if(formInput.node.querySelector('.form-input_maskDate')) 
        formInput.input.setMask('99.99.9999')
})

// form-radio
document.querySelectorAll('.form-radio').forEach((node) => new form.FormRadio({node}))


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

document.querySelectorAll('.form-rate').forEach((node) => {
    if(node.classList.contains('form-rate_fourStars')) new form.FormRate({node, defaultRate: 4})
    else if(node.classList.contains('form-rate_fiveStars')) new form.FormRate({node, defaultRate: 5})
    else new form.FormRate({node})
})

document.querySelectorAll('.dropdown').forEach((node) => {
    let dropdown = new Dropdown({node})
    if(dropdown.node.classList.contains('uikit_dropdown_opened')) dropdown.open()
})
document.querySelectorAll('.slider').forEach((node) => {
    let slider = new Slider({node})

    // console.log(slider)
})

var blocks = {    
    formSlider: form.formSlider.init('.js_form-slider'),
    formPagination: form.formPagination.init({
        currentPage: 1,
        pagesAmount: 15,
        pageContent: 12,
        allContent: 160
    })
}