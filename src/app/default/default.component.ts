import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavService } from '../core/services/navigate.service';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  @ViewChild('appDrawer')
  appDrawer!: ElementRef;
  isExpanded = false;
  element!: HTMLElement;
  userid!: number;
  username!: string;
  show: boolean = false
  sideBarOpen = true
  photoUrl!: string;
  name!: string;


  constructor(
    private navService: NavService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) { }



  ngOnInit() {

  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  toggleActive(event:any){
    event.preventDefault();
    if(this.element !== undefined){
      this.element.style.backgroundColor = "white"
      this.element.style.color = "#333333"
      this.element.style.borderLeft = "none"
   //   this.element.style.fontWeight = "600"
    } 
    var target = event.currentTarget
    console.log("esta es la target")
    console.log(target)
    target.style.backgroundColor = "#EBECEC"
    target.style.borderLeft = "#FE0000 2px solid"
    target.style.color = "#FE0000"
    target.style.fill = "red"
    this.element = target
    console.log(target)
  }

  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }


  logout() {
    this.router.navigate(['/login'])
  }

  goItems() {
    this.router.navigate(['/items'])
  }

}

