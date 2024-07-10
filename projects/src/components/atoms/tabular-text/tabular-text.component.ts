import { Component, Input, ViewEncapsulation } from '@angular/core';

const CLASS_BASE = 'rls-tabular-text';
const POINTERS = ['.', ','];

@Component({
  selector: 'rls-tabular-text',
  standalone: true,
  templateUrl: 'tabular-text.component.html',
  styleUrls: ['tabular-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsTabularTextComponent {
  @Input()
  public value = '';

  protected getClassCharacter(character: string): string {
    return POINTERS.includes(character)
      ? `${CLASS_BASE}__pointer`
      : `${CLASS_BASE}__char`;
  }
}
