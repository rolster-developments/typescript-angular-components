import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { RlsRadiobuttonComponent } from '../../atoms';

@Component({
  selector: 'rls-label-radiobutton',
  standalone: true,
  templateUrl: 'label-radiobutton.component.html',
  styleUrls: ['label-radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsRadiobuttonComponent]
})
export class RlsLabelRadiobuttonComponent<T = any> {
  @Input()
  public formControl?: FormControl<Undefined<T>>;

  @Input()
  public value?: T;

  @Input()
  public disabled = false;

  @Input()
  public extended = false;

  protected currentState?: T;

  protected get checked(): boolean {
    const state = this.formControl ? this.formControl.state : this.currentState;

    return state === this.value;
  }

  public onSelect(): void {
    if (this.formControl) {
      this.formControl?.setState(this.value);
    }

    this.currentState = this.value;
  }
}
