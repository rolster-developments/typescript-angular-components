import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { RlsCheckboxComponent } from '../../atoms';

@Component({
  selector: 'rls-label-checkbox',
  standalone: true,
  templateUrl: 'label-checkbox.component.html',
  styleUrls: ['label-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsCheckboxComponent]
})
export class RlsLabelCheckboxComponent {
  @Input()
  public formControl?: FormControl<boolean>;

  @Input()
  public disabled = false;

  @Input()
  public extended = false;

  protected currentState = false;

  protected get checked(): boolean {
    return this.formControl ? !!this.formControl.state : this.currentState;
  }

  public onToggle(): void {
    if (this.formControl) {
      this.formControl?.setState(!this.formControl.state);
    }

    this.currentState = !this.currentState;
  }
}
