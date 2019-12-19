export const formInput = {
    setMask(inputClass) {
        require("./jquery.maskedinput.js");
        $(`.${inputClass}`).mask('99.99.9999');
    }
}