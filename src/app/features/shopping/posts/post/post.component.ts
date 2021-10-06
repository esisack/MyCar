import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryComponent, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Item } from 'src/app/data/model/item';
import { ItemService } from 'src/app/data/services/item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  imageUrl = environment.imgUrl;
  item!: Item
  itemId!: number
  galleryOptions!: NgxGalleryOptions[]
  galleryImages!: NgxGalleryImage[]

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];
    this.itemService.getDataById(this.itemId).subscribe(data => {
      this.item = data
      this.fillGallery(this.item)
    })

  }
  fillGallery(item: Item) {
    this.galleryOptions = [
      {
        width: '600px',
        height: '600px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    console.log(item.documents[0].documentName)
    this.galleryImages = []
    item.documents.forEach(data => {
      console.log(data)
      this.addImage(data.documentName)
    })


    //     this.galleryImages = [
    //       {
    //         small: this.imageUrl + item.documents[0].documentName,
    //         medium: this.imageUrl + item.documents[0].documentName,
    //         big: this.imageUrl + item.documents[0].documentName,
    //       },{
    //         small: this.imageUrl + item.documents[1].documentName,
    //         medium: this.imageUrl + item.documents[1].documentName,
    //         big: this.imageUrl + item.documents[1].documentName,
    //       },{
    //         small: this.imageUrl + item.documents[2].documentName,
    //         medium: this.imageUrl + item.documents[2].documentName,
    //         big: this.imageUrl + item.documents[2].documentName,
    //       },{
    //         small: this.imageUrl + item.documents[3].documentName,
    //         medium: this.imageUrl + item.documents[3].documentName,
    //         big: this.imageUrl + item.documents[3].documentName,
    //       }
    // ]
  }

  addImage(imageName: string): void {
    let newImages = this.galleryImages.slice(0, this.galleryImages.length);
    newImages.push({
      small: this.imageUrl + imageName,
      medium: this.imageUrl + imageName,
      big: this.imageUrl + imageName
    });
    this.galleryImages = newImages;
  }
}
