import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { RlsSwitchComponent } from '../../atoms';

@Component({
  selector: 'rls-label-switch',
  standalone: true,
  templateUrl: 'label-switch.component.html',
  styleUrls: ['label-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsSwitchComponent]
})
export class RlsLabelSwitchComponent {
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
