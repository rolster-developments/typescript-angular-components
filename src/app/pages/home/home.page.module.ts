import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRouting } from './home.page.routing';
import {
  RlsFieldNumberComponent,
  RlsFieldTextComponent
} from '../../../../projects/src/components';

@NgModule({
  declarations: [HomePage],
  imports: [HomePageRouting, RlsFieldTextComponent, RlsFieldNumberComponent]
})
export class HomePageModule {}
