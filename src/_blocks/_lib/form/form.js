import { FormQuantity } from "./form-quantity/form-quantity";

import { FormDropdown } from "./form-dropdown/form-dropdown";

import { formPagination } from "./form-pagination/form-pagination";

import { formSlider } from "./form-slider/form-slider";

import { formRate } from "./form-rate/form-rate";
import { Input } from "./input/input";

import { FormInput } from "./form-input/form-input";


export const form = {
    Input: Input,
    FormInput: FormInput, 
    FormDropdown: FormDropdown, 
    FormQuantity: FormQuantity,
     
    formRate: formRate, 
    formSlider: formSlider, 
    formPagination: formPagination
}