import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryComponent, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Category } from 'src/app/data/model/category';
import { Document } from 'src/app/data/model/document';
import { Item } from 'src/app/data/model/item';
import { ItemType } from 'src/app/data/model/item-type';
import { Make } from 'src/app/data/model/make';
import { Model } from 'src/app/data/model/model';
import { Trim } from 'src/app/data/model/trim';
import { CategoryService } from 'src/app/data/services/category.service';
import { ItemTypeService } from 'src/app/data/services/item-type.service';
import { ItemService } from 'src/app/data/services/item.service';
import { MakeService } from 'src/app/data/services/make.service';
import { ModelService } from 'src/app/data/services/model.service';
import { TrimService } from 'src/app/data/services/trim.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {
  imageUrl = environment.imgUrl;

  galleryOptions!: NgxGalleryOptions[]
  galleryImages!: NgxGalleryImage[]

  submitStatus: boolean = false;
  form!: FormGroup
  item!: Item
  itemId!: number

  documents: Document[] = []
  makes: Make[] = []
  models: Model[] = []
  trims: Trim[] = []
  itemTypes: ItemType[] = []
  categories: Category[] = []

  constructor(
    private itemService: ItemService,
    private makeService: MakeService,
    private modelService: ModelService,
    private trimService: TrimService,
    private itemTypeService: ItemTypeService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];
    this.initFormValidators()
  }


  onSelectMake(id: number) {
    this.getDataByMake(id)
  }

  onSelectModel(id: number) {
    this.getDataByModel(id);
  }

  getDataByMake(id: number) {
    console.log(id)
    this.modelService.getDataByMake(id).subscribe(data => {
      this.models = data
      console.log(data)
    })
  }

  getDataByModel(id: number) {
    this.trimService.getDataByModel(id).subscribe(data => {
      this.trims = data
    })
  }

  initFormValidators() {
    this.form = this.formBuilder.group({
      itemTypeId: [, { validators: [Validators.required], updateOn: "change" }],
      categoryId: [, { validators: [Validators.required], updateOn: "change" }],
      makeId: [, { validators: [Validators.required], updateOn: "change" }],
      modelId: [, { validators: [Validators.required], updateOn: "change" }],
      trimId: [, { validators: [Validators.required], updateOn: "change" }],
      year: [, { validators: [Validators.required], updateOn: "change" }],
      km: [, { updateOn: "change" }],
      transmition: [, { validators: [Validators.required], updateOn: "change", }],
      fuel: [, { validators: [Validators.required], updateOn: "change" }],
      color: [, { validators: [Validators.required], updateOn: "change" }],
      description: [, { updateOn: "change" }],
      price: [, { validators: [Validators.required], updateOn: "change" }],
      salePrice: [, { updateOn: "change" }],
    });
    
    this.makeService.getData().subscribe(data => {
      this.makes = data
    })

    this.itemTypeService.getData().subscribe(data => {
      this.itemTypes = data
    })

    this.categoryService.getData().subscribe(data => {
      this.categories = data
    })
    this.itemService.getDataById(this.itemId).subscribe(data => {
      this.item = data
      this.documents = data.documents
      this.getDataByMake(this.item.make.makeId)
      this.getDataByModel(this.item.model.modelId)

      this.form.get('itemTypeId')?.setValue(this.item.itemType.itemTypeId)
      this.form.get('categoryId')?.setValue(this.item.category.categoryId)
      this.form.get('makeId')?.setValue(this.item.make.makeId)
      this.form.get('modelId')?.setValue(this.item.model.modelId)
      this.form.get('trimId')?.setValue(this.item.trim.trimId)
      this.form.get('year')?.setValue(this.item.year)
      this.form.get('km')?.setValue(this.item.km)
      this.form.get('fuel')?.setValue(this.item.fuel)
      this.form.get('transmition')?.setValue(this.item.transmition)
      this.form.get('color')?.setValue(this.item.color)
      this.form.get('description')?.setValue(this.item.description)
      this.form.get('price')?.setValue(this.item.price)
      this.form.get('salePrice')?.setValue(this.item.salePrice)
    })

  }

 
  onSubmit() {

  }
}