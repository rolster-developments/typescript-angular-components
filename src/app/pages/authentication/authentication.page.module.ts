import { NgModule } from '@angular/core';
import { AuthenticationPage } from './authentication.page';
import { AuthenticationPageRouting } from './authentication.page.routing';

@NgModule({
  declarations: [AuthenticationPage],
  imports: [AuthenticationPageRouting]
})
export class AuthenticationPageModule {}
