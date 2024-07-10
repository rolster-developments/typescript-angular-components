import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRouting } from './home.page.routing';
import {
  RlsAmountComponent,
  RlsFieldMoneyComponent,
  RlsFieldNumberComponent,
  RlsFieldTextComponent,
  RlsTabularTextComponent
} from '../../../../projects/src/components';

@NgModule({
  declarations: [HomePage],
  imports: [
    HomePageRouting,
    RlsFieldTextComponent,
    RlsFieldNumberComponent,
    RlsTabularTextComponent,
    RlsAmountComponent,
    RlsFieldMoneyComponent
  ]
})
export class HomePageModule {}
