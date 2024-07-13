import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRouting } from './home.page.routing';
import {
  RlsAmountComponent,
  RlsButtonComponent,
  RlsButtonActionComponent,
  RlsFieldMoneyComponent,
  RlsFieldNumberComponent,
  RlsFieldPasswordComponent,
  RlsFieldTextComponent,
  RlsTabularTextComponent
} from '../../../../projects/src';

@NgModule({
  declarations: [HomePage],
  imports: [
    HomePageRouting,
    RlsFieldTextComponent,
    RlsFieldNumberComponent,
    RlsTabularTextComponent,
    RlsAmountComponent,
    RlsButtonComponent,
    RlsFieldMoneyComponent,
    RlsButtonActionComponent,
    RlsFieldPasswordComponent
  ]
})
export class HomePageModule {}
