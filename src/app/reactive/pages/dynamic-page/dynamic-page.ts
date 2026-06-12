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

  newFavorite = this.fb.control("", Validators.required);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required))
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
