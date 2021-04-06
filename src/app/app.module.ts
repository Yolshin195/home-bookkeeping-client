import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { OrderLineComponent } from './order-line/order-line.component';
import { SumPipe } from './sum.pipe';
import { OrderCreateComponent } from './order-create/order-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { CounterpartyCreateComponent } from './counterparty-create/counterparty-create.component';
import { NomenclatureCreateComponent } from './nomenclature-create/nomenclature-create.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrderLineComponent,
    SumPipe,
    OrderCreateComponent,
    NomenclatureComponent,
    CounterpartyCreateComponent,
    NomenclatureCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
