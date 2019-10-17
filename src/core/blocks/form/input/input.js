export default function input() {
    require("./jquery.maskedinput.js");
    console.log('input')
    $('.js-input_maskDate').mask('99.99.9999');

    console.log($('.js-input_maskDate'))
}