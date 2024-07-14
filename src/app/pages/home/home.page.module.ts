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
  RlsTabularTextComponent,
  RlsAvatarComponent,
  RlsBadgeComponent,
  RlsCheckboxComponent,
  RlsLabelComponent,
  RlsPosterComponent,
  RlsProgressBarComponent,
  RlsProgressCircularComponent,
  RlsRadiobuttonComponent,
  RlsSkeletonComponent,
  RlsSkeletonTextComponent,
  RlsSwitchComponent
} from '../../../../projects/src';

@NgModule({
  declarations: [HomePage],
  imports: [
    HomePageRouting,
    RlsBadgeComponent,
    RlsLabelComponent,
    RlsAvatarComponent,
    RlsCheckboxComponent,
    RlsFieldTextComponent,
    RlsFieldNumberComponent,
    RlsTabularTextComponent,
    RlsAmountComponent,
    RlsButtonComponent,
    RlsFieldMoneyComponent,
    RlsButtonActionComponent,
    RlsFieldPasswordComponent,
    RlsPosterComponent,
    RlsProgressBarComponent,
    RlsProgressCircularComponent,
    RlsRadiobuttonComponent,
    RlsSkeletonComponent,
    RlsSkeletonTextComponent,
    RlsSwitchComponent
  ]
})
export class HomePageModule {}
