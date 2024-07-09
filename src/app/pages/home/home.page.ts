import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { required } from '@rolster/validators/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  protected formControl = new FormControl<string>('Daniel Castillo', [
    required
  ]);

  protected formNumber = new FormControl<number>(30, [required]);

  protected name = signal('Daniel');

  public onClick(): void {
    this.formControl.setState('Adrian Castillo');
    this.name.set('Adrian');
  }
}
