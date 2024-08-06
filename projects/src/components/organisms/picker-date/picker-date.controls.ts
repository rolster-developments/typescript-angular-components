import { FormControl, FormControls, FormGroup } from '@rolster/angular-forms';

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
    const year = new FormControl(date.getFullYear());
    const month = new FormControl(date.getMonth());
    const day = new FormControl(date.getDate());

    super({
      controls: { day, month, year }
    });

    this.day = day;
    this.month = month;
    this.year = year;
  }

  public setDate(date: Date): void {
    this.year.setState(date.getFullYear());
    this.month.setState(date.getMonth());
    this.day.setState(date.getDate());
  }
}
