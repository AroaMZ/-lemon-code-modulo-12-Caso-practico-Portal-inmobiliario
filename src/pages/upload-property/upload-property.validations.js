import { Validators, createFormValidation } from "@lemoncode/fonk";
import { isUrl } from '@lemoncode/fonk-is-url-validator';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';


//como puedo ver la condiciones de validarlo para ponerselo al mensaje.
const validationSchema = {
    field: {
            title: [Validators.required],
            notes: [Validators.required],
            email: [Validators.required, Validators.email],
            phone: [Validators.required, isNumber.validator],
            price: [Validators.required],
            saleTypes: [Validators.required, arrayRequired.validator],
            address: [Validators.required],
            city: [Validators.required],
            province: [Validators.required],
            squareMeter: [Validators.required],
            rooms: [Validators.required],
            bathrooms: [Validators.required],
            locationUrl: [Validators.required, isUrl.validator],
            mainFeatures: [{validator: arrayRequired.validator, customArgs: { minLength: 0 }}],
            //mainFeatures:[Validators.required, arrayRequired.validator, customArgs.customArgs { minLength: 0 }],
            //house: [Validators.required],
            equipments: [Validators.required, arrayRequired.validator],
            
    },
};

export const formValidation = createFormValidation(validationSchema);