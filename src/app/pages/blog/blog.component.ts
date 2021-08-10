import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/models/discount/discount.model';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
public userDiscounts:Array<IDiscount> = [];


  constructor(
    private discountService:DiscountService
  ) { }

  ngOnInit(): void {
    this.loadDiscount();
  }

  loadDiscount():void{
    this.userDiscounts = this.discountService.getDicounts();
  }
}
