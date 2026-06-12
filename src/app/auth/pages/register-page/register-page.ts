import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {

  private fb = inject(FormBuilder);
  formUtil = formUtils;


  myForm = this.fb.group({
    name: ['',[Validators.required, Validators.pattern(formUtils.namePattern)]],
    email: ["@", [Validators.required, Validators.pattern(formUtils.emailPattern)],[formUtils.checkingServerResponse]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(formUtils.notOnlySpacesPattern), formUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['',  [Validators.required]]
  },{
    validators: [
      formUtils.isFieldOneEqualFielTwo('password','confirmPassword'),
    ]
  });



  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}
