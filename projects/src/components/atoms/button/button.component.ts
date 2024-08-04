import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { RlsIconComponent } from '../icon/icon.component';

export type RlsButtonType = 'raised' | 'flat' | 'stroked' | 'outline' | 'ghost';

@Component({
  selector: 'button[rls-button]',
  standalone: true,
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsIconComponent]
})
export class RlsButtonComponent implements OnInit {
  @Input('rls-button')
  public type: RlsButtonType = 'raised';

  @Input()
  public disabled = false;

  @Input()
  public prefixIcon = '';

  @Input()
  public suffixIcon = '';

  protected className = 'rls-button__content--raised';

  constructor(private ref: ElementRef<HTMLButtonElement>) {}

  public ngOnInit(): void {
    this.className = `rls-button__content--${this.type}`;
    this.ref.nativeElement.classList.add('rls-button');
  }
}
