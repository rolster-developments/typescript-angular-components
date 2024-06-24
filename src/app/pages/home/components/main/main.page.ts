import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PopupComponentService } from 'projects/components/organisms';
import { personsElement } from 'src/app/resources/persons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
  public control: FormControl;
  public salary: FormControl;
  public role: FormControl;

  public persons = personsElement;

  public checked = false;

  constructor(private popupService: PopupComponentService) {
    this.control = new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5)
    ]);

    this.salary = new FormControl();
    this.role = new FormControl();
  }

  public onConfirmation(): void {
    this.popupService.launch({
      message: '¿Desea realizar el registro de la factura de venta?',
      subtitle: 'Xigeness v0.9.2',
      title: 'Factura de venta',
      theme: 'success',
      approved: {
        label: 'Registrar'
      },
      reject: {
        label: 'Cancelar registro'
      }
    });
  }
}
