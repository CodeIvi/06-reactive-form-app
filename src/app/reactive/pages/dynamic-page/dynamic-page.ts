import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPage {

  private fb = inject(FormBuilder)
  formUtils = formUtils

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      //ARRAY DE JUEGOS
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ],
      Validators.minLength(3))
  })

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // isValidFielinArray(formArray: FormArray, index:number){
  //   return (
  //     formArray.controls[index].errors && formArray.controls[index].touched
  //   );
  // }
}
