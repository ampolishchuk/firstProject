export default function input() {
    require("./jquery.maskedinput.js");
    console.log('input')
    $('.js-input_maskDate').mask('99.99.9999');

    console.log($('.js-input_maskDate'))

    var params2 = {}
    params2.container = {mod:'form-like'}
    params2.label = {mod:'form-like_label'}
    params2.input = {mod:'form-like_input',attr:{type:'checkbox'}}
    params2.title = {mod:'form-like_title'}
    params2.button = {mod:'form-like_button', value:'0'}
    params2.icon = {mod:'form-like_icon'}
    
    var params = {
        button:{
            value:'12'
        },
        input:{
            attr:{checked:''}
        }
    }
      
      function mergeObj(obj1, obj2) {
        if(!obj1) obj1 = {}
        for(var key in obj2) {
            if(typeof obj2[key] === 'object') {
                obj1[key] = mergeObj(obj1[key], obj2[key])
            } else {
                obj1[key] = key in obj1?obj1[key]:''
                switch(key) {
                    case 'mod':
                        obj1[key] += ' ' + obj2[key]
                        break
                    default:
                        obj1[key] = obj2[key]
                }
            }
        }

        return obj1
      }
      console.log(mergeObj(params2, params))
}