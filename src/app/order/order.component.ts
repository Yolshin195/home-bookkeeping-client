import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    this.order = this.orderService.getOne(1);
  }

}
