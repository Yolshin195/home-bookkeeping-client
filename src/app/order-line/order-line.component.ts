import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-line',
  templateUrl: './order-line.component.html',
  styleUrls: ['./order-line.component.css']
})
export class OrderLineComponent implements OnInit {
  public orderList: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void {
    this.orderService.getOrderList()
      .subscribe(orderList => this.orderList = orderList);
  }

}
