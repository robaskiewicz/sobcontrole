import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespesasPageRoutingModule } from './despesas-routing.module';

import { DespesasPage } from './despesas.page';

import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespesasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DespesasPage, FormComponent],
  entryComponents:[FormComponent]
})
export class DespesasPageModule {}
