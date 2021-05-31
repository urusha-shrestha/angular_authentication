import { Form, FormGroup } from '@angular/forms';

export function MustMatch(controlName:string, matchingControlName: string)
{
    return (formGroup:FormGroup) => 
    {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        //validation to make sure that confirm password and password fields has matching values
        if(matchingControl.errors && !matchingControl.errors.mustMatch)
        {
            return;
        }

        if(control.value !== matchingControl.value)
        {
            matchingControl.setErrors({mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
    }
}