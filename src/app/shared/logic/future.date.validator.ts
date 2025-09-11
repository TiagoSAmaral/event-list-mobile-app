import { AbstractControl, ValidationErrors } from "@angular/forms";

const futureDateValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return value > today ? null : { notFutureDate: true };
  }

  export default futureDateValidator;