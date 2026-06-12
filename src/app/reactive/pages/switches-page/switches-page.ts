import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPage {

  private fb = inject(FormBuilder);
  formUtils = formUtils;

  myForm : FormGroup = this.fb.group({
    gender: [,Validators.required],
    wantNotifications:[true],
    termsAndConditions:[false, Validators.requiredTrue]
  })


  onSubmit() {
    this.myForm.markAllAsTouched();
}
}
