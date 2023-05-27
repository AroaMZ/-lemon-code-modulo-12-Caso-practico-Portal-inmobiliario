import { Validators, createFormValidation } from "@lemoncode/fonk";

//como puedo ver la condiciones de validarlo para ponerselo al mensaje.
const validationSchema = {
    field: {
        email: [Validators.required, Validators.email],
        message: [Validators.required],
    },
};

export const formValidation = createFormValidation(validationSchema);