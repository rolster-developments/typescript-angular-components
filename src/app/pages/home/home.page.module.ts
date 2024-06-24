import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRouting } from './home.page.routing';
import {
  SidenavComponentModule,
  ToolbarComponentModule
} from 'projects/components';

@NgModule({
  declarations: [HomePage],
  imports: [
    ReactiveFormsModule,
    HomePageRouting,
    ToolbarComponentModule,
    SidenavComponentModule
  ]
})
export class HomePageModule {}
