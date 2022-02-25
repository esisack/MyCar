import { Route } from '@angular/compiler/src/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

import { Category } from 'src/app/data/model/category';
import { Document } from 'src/app/data/model/document';
import { FileBase64Dto } from 'src/app/data/model/dto/file-base64-dto';
import { ItemDto } from 'src/app/data/model/dto/item-dto';
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

  images: SafeUrl[] = []

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
  image!: string | SafeUrl
  dto!: ItemDto;
  files: File[] = [];
  filesBase64!: FileBase64Dto
  imagenes: string[] = []
  imageBase64!: string


  constructor(
    private itemService: ItemService,
    private makeService: MakeService,
    private modelService: ModelService,
    private trimService: TrimService,
    private itemTypeService: ItemTypeService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
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
      itemName: [, { validators: [Validators.required], updateOn: "change" }],
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
      itemCode: ["CODE", { updateOn: "change" }],
      used: ["Y", { updateOn: "change" }],
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
      this.documents.forEach(element => {
        this.images.push(this.imageUrl + element.documentName)
      })

      this.getDataByMake(this.item.make.makeId)
      this.getDataByModel(this.item.model.modelId)
      this.form.get('itemTypeId')?.setValue(this.item.itemType.itemTypeId)
      this.form.get('itemName')?.setValue(this.item.itemName)
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
      this.form.get('itemCode')?.setValue(this.item.itemCode)
      this.form.get('used')?.setValue(this.item.used)
      this.form.get('price')?.setValue(this.item.price)
      this.form.get('salePrice')?.setValue(this.item.salePrice)
    })

  }


  onSubmit() {
    this.dto = new ItemDto();

    this.dto.itemTypeId = this.form.get('itemTypeId')?.value
    this.dto.itemCode = this.form.get('itemCode')?.value
    this.dto.itemName = this.form.get('itemName')?.value
    this.dto.used = this.form.get('used')?.value
    this.dto.categoryId = this.form.get('categoryId')?.value
    this.dto.makeId = this.form.get('makeId')?.value
    this.dto.modelId = this.form.get('modelId')?.value
    this.dto.trimId = this.form.get('trimId')?.value
    this.dto.year = this.form.get('year')?.value
    this.dto.km = this.form.get('km')?.value
    this.dto.fuel = this.form.get('fuel')?.value
    this.dto.transmition = this.form.get('transmition')?.value
    this.dto.color = this.form.get('color')?.value
    this.dto.description = this.form.get('description')?.value
    this.dto.price = this.form.get('price')?.value
    this.dto.salePrice = this.form.get('salePrice')?.value
    this.dto.customerId = 1
    this.dto.images = []
    this.dto.imagesName = []

    for (var i = 0; i < this.files.length; i++) {
      var name = this.files[i].name
      var type = this.files[i].type
      this.convertFileToBase64(this.files[i])
      this.dto.imagesName.push(name)
      this.dto.images.push(this.imageBase64.split(",")[1])
      console.log(this.dto.imagesName)
      console.log(this.dto.images)


    }

    console.log("paso por ...")
    console.log(this.dto)
    this.itemService.saveData(this.dto).subscribe(data => {  })
  }



  updateImage(ev: any) {
    const files: FileList = ev.target.files
    for (var i = 0; i < files.length; i++) {
      this.image = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(files[i])
      );
      this.images.push(this.image)
      this.files.push(files[i])

    }
    
  }


  convertFileToBase64(file: File): void {
    const reader = new FileReader();
    var base64Str = ""
    reader.readAsDataURL(file as Blob) 
    reader.onloadend = () => {
     this.imageBase64 = reader.result as string
    }
  }

}