import { FormArray, FormGroup } from "@angular/forms";

export class formUtils{
    //Expresiones regulares


 static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (!!form.controls[fieldName].errors &&
      form.controls[fieldName].touched);
  }

  static   getFieldError(form:FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
      }

    }
    return null;

  }

   static isValidFielinArray(formArray: FormArray, index:number){
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

   static  getFieldErrorInArray(form:FormArray, index:number): string | null {
    if (!form.controls[index]) return null;

    const errors = form.controls[index].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
      }

    }
    return null;

  }

    
}