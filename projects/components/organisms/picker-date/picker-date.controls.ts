import {
  FormControl,
  FormControls,
  FormGroup,
  formControl
} from '@rolster/angular-forms';

interface PickerDateControls extends FormControls {
  day: FormControl<number>;
  month: FormControl<number>;
  year: FormControl<number>;
}

export class PickerDateGroup extends FormGroup<PickerDateControls> {
  public readonly day: FormControl<number>;

  public readonly month: FormControl<number>;

  public readonly year: FormControl<number>;

  constructor(date: Date) {
    const year = formControl(date.getFullYear());
    const month = formControl(date.getMonth());
    const day = formControl(date.getDate());

    super({
      controls: { day, month, year }
    });

    this.day = day;
    this.month = month;
    this.year = year;
  }

  public setDate(date: Date): void {
    this.year.setValue(date.getFullYear());
    this.month.setValue(date.getMonth());
    this.day.setValue(date.getDate());
  }
}
