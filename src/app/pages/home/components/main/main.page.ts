import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { personsElement } from 'src/app/resources/persons';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
  public control: FormControl;
  public salary: FormControl;
  public role: FormControl;

  public persons = personsElement;

  public checked = false;

  constructor() {
    this.control = new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5)
    ]);

    this.salary = new FormControl();
    this.role = new FormControl();
  }

  public onConfirmation(): void {
  }
}
