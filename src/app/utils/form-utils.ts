import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";
import { pattern, ValidationError } from "@angular/forms/signals";

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  })
}

export class formUtils {
  //Expresiones regulares

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';




  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (!!form.controls[fieldName].errors &&
      form.controls[fieldName].touched);
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
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
        case 'pattern':
          if (errors['pattern'].requiredPattern == formUtils.emailPattern) {
            return 'El correo electrónico no es permitido'
          }
          return 'Error de patrón contra expresión regular';
        case 'emailTaken':
          return "El email ya está siendo usado";
        case 'userNameNoValid':
          return 'no se puede usar ese nombre de usuario por política de empresa';

        default:
          return 'Error de validación no controlado'
      }

    }
    return null;

  }

  static isValidFielinArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(form: FormArray, index: number): string | null {
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

  static isFieldOneEqualFielTwo(field: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const fieldValue = formGroup.get(field)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return fieldValue === field2Value ? null : { passwordNotEqual: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value;

    if (formValue == 'hola@mundo.com') {
      return {
        emailTaken: true,
      }
    }
    return null;

  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value == 'strider' ? { notStrider: true } : null;

  }



}