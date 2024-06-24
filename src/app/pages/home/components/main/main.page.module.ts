import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { XofttionComponentsModule } from 'projects/components/components.module';

import { MainComponent } from './main.page';
import { MainComponentRouting } from './main.page.routing';
@NgModule({
  declarations: [MainComponent],
  imports: [ReactiveFormsModule, MainComponentRouting, XofttionComponentsModule]
})
export class MainComponentModule {}
