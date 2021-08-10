import { Injectable } from '@angular/core';
import { IDiscount } from '../../models/discount/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private arrDiscounts: Array<IDiscount> = []
  constructor() { }

  getDicounts(): Array<IDiscount> {
    return this.arrDiscounts;
  }

  addDiscount(discount: IDiscount): void {
    discount.date = new Date();
    this.arrDiscounts.push(discount);
  }

  deleteDiscount(id: number): void {
    const index = this.arrDiscounts.findIndex(disc => disc.id === id);
    this.arrDiscounts.splice(index, 1)
  }

  updateDiscount(discount: IDiscount): void {
    discount.date = new Date();
    const index = this.arrDiscounts.findIndex(disc => disc.id === discount.id);
    this.arrDiscounts.splice(index, 1, discount)
  }
}
