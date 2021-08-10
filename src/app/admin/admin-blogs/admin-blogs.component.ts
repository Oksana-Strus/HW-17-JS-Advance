import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDiscount } from 'src/app/shared/models/discount/discount.model';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {

  public adminDiscounts: Array<IDiscount> = [];
  public discountForm!: FormGroup;
  public customImage = 'https://pizzaletta.com/storage/2019/10/gallery_3.jpg';
  private editDiscountId = 0;
  public isEdit = false;
  constructor(
    private discountService: DiscountService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
    this.initDiscountForm();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      author: [null, Validators.required],
      image: this.customImage,
    })
  }

  loadDiscounts(): void {
    this.adminDiscounts = this.discountService.getDicounts();
  }

  createDiscount(): void {
    this.discountService.addDiscount(this.discountForm.value);
    this.discountForm.reset();
  }

  deleteDiscount(discount: IDiscount): void {
    this.discountService.deleteDiscount(discount.id as number)
  }

  editDiscount(discount: IDiscount): void {
    this.discountForm.patchValue({
      title: discount.title,
      text: discount.text,
      author: discount.author,
      date: discount.date,
      image: discount.image
    });
    this.editDiscountId = discount.id as number;
    this.isEdit = true;
  }


  updateDiscount(): void {
    const discount = this.discountForm.value;
    discount.id = this.editDiscountId;
    this.discountService.updateDiscount(discount);
    this.initDiscountForm();
    this.isEdit = false;
  }

}
