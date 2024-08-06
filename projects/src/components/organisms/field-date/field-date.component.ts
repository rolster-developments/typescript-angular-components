import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { PickerListenerType } from '@rolster/components';
import { dateFormatTemplate } from '@rolster/dates';
import { RlsButtonActionComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../../molecules';
import { RlsModalComponent } from '../modal/modal.component';
import {
  PickerDateListener,
  RlsPickerDateComponent
} from '../picker-date/picker-date.component';

function getFieldFormat(date: Undefined<Date>, format: string): string {
  return date ? dateFormatTemplate(date, format) : '';
}

@Component({
  selector: 'rls-field-date',
  standalone: true,
  templateUrl: 'field-date.component.html',
  styleUrls: ['field-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonActionComponent,
    RlsMessageFormErrorComponent,
    RlsPickerDateComponent,
    RlsModalComponent
  ]
})
export class RlsFieldDateComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  public formControl?: FormControl<Undefined<Date>>;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public disabled = false;

  @Input()
  public format = '{dd}/{mx}/{aa}';

  @Output()
  public value: EventEmitter<Undefined<Date>>;

  private unsusbcription?: Unsubscription;

  protected currentValue?: Date;

  protected formatDate = '';

  protected modalIsVisible = false;

  constructor() {
    this.value = new EventEmitter();
    this.currentValue = new Date();
    this.setFormatDate(this.currentValue);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl } = changes;

    if (formControl?.currentValue) {
      this.subscribeInFormControl(formControl?.currentValue);
    }
  }

  public ngOnInit(): void {
    if (this.formControl) {
      this.subscribeInFormControl(this.formControl);
    }
  }

  public ngOnDestroy(): void {
    this.unsusbcribe();
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled || this.disabled;
  }

  public onInput(): void {
    this.modalIsVisible = true;
  }

  public onAction(): void {
    if (this.currentValue) {
      this.onChange(undefined);
      this.formControl?.setState(undefined);
      this.formControl?.touch();
    } else {
      this.modalIsVisible = true;
    }
  }

  public onListener({ type, value }: PickerDateListener): void {
    if (type !== PickerListenerType.Cancel) {
      this.onChange(value);
    }

    this.formControl?.touch();
    this.modalIsVisible = false;
  }

  private setFormatDate(date?: Date): void {
    this.formatDate = getFieldFormat(date, this.format);
  }

  private onChange(value?: Date): void {
    this.currentValue = value;
    this.setFormatDate(value);

    this.value.emit(value);
  }

  private unsusbcribe(): void {
    if (this.unsusbcription) {
      this.unsusbcription();
    }
  }

  private subscribeInFormControl(
    formControl: FormControl<Undefined<Date>>
  ): void {
    this.unsusbcribe();

    this.unsusbcription = formControl.subscribe((value) => {
      this.setFormatDate(value);
    });
  }
}
