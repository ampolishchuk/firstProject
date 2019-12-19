import './uikit.sass'

import {
    formInput, 
    formRate, 
    formSlider, 
    formPagination, 
    formDropdown,
    formQuantity
} from '../_blocks/blocks'

var blocks = {
    formInput: formInput.setMask('js_form-input_maskDate'),
    formRate: formRate.init('.js_form-rate'),
    formSlider: formSlider.init('.js_form-slider'),
    formPagination: formPagination.init({
        currentPage: 1,
        pagesAmount: 15,
        pageContent: 12,
        allContent: 160
    }),
    dropdowns: formDropdown.init({
        closed: true
    }),
    quantities: formQuantity.init(),
    getBlock(blocksArray, blockClass) {
        return blocksArray.filter((block) => $(block.object).hasClass(blockClass))[0]
    }
}

blocks = {
    ...blocks,
    roomsClosed: {
        quantity: blocks.getBlock(blocks.quantities, 'form-quantity_rooms_closed')
    },
    rooms: {    
        dropdown: blocks.getBlock(blocks.dropdowns, 'form-dropdown_rooms'),
        quantity: blocks.getBlock(blocks.quantities, 'form-quantity_rooms')
    },
    guests: {
        dropdown: blocks.getBlock(blocks.dropdowns, 'form-dropdown_guests'),
        quantity: blocks.getBlock(blocks.quantities, 'form-quantity_guests'),
    },
    guestsFilled: {
        dropdown: blocks.getBlock(blocks.dropdowns, 'form-dropdown_guests_filled'),
        quantity: blocks.getBlock(blocks.quantities, 'form-quantity_guests_filled'),
    }
}

blocks.rooms.dropdown.open()
blocks.rooms.quantity.initTitle({class:'.form-dropdown_rooms .form-dropdown_input'})

blocks.guests.dropdown.open()
blocks.guests.quantity.initTitle({class:'.form-dropdown_guests .form-dropdown_input'})

blocks.guestsFilled.dropdown.open()
blocks.guestsFilled.quantity.initTitle({
    class: '.form-dropdown_guests_filled .form-dropdown_input',
    type: 'summury',
    declensions: ['гость', 'гостя', 'гостей']
})

// console.log(blocks.guestsFilled.quantity)
