import { Component, Input, ViewEncapsulation } from '@angular/core';
import { currencyFormat } from '@rolster/helpers-advanced';
import { RlsTabularTextComponent } from '../tabular-text/tabular-text.component';

@Component({
  selector: 'rls-amount',
  standalone: true,
  templateUrl: 'amount.component.html',
  styleUrls: ['amount.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsTabularTextComponent]
})
export class RlsAmountComponent {
  @Input()
  public value = 0;

  @Input()
  public decimals = false;

  @Input()
  public symbol = '';

  protected get valueFormat(): string {
    return currencyFormat({ value: this.value, decimals: this.decimals });
  }
}
