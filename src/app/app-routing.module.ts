import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterpartyCreateComponent } from './counterparty-create/counterparty-create.component';
import { NomenclatureCreateComponent } from './nomenclature-create/nomenclature-create.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderLineComponent } from './order-line/order-line.component';
import { OrderComponent } from './order/order.component';
import { PriceCreateComponent } from './price-create/price-create.component';

const routes: Routes = [
  {path: 'create-order', component: OrderCreateComponent},
  {path: 'create-nomenclature', component: NomenclatureCreateComponent},
  {path: 'create-counterparty', component: CounterpartyCreateComponent},
  {path: 'create-price', component: PriceCreateComponent},
  {path: 'list-order', component: OrderLineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
