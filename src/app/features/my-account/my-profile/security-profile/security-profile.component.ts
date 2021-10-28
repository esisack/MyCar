import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { CustomerService } from 'src/app/data/services/customer.service';



@Component({
  selector: 'app-security-profile',
  templateUrl: './security-profile.component.html',
  styleUrls: ['./security-profile.component.scss']
})
export class SecurityProfileComponent implements OnInit {

  username!: string;
  mail!: string;
  freeze: boolean = true
  action: string = "Descongelar"
  label: string = "Rehabilitá tú cuenta"

  constructor(
    private token: TokenStorageService,
    private dialog: MatDialog,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.username = this.token.getUser()
    this.mail = this.token.getUser()
    this.init()

  }

  init() {
    this.freeze = this.customerService.currentCustomer.freeze == 1
    if (this.freeze) {
      this.action = "Descongelar"
      this.label = "Rehabilitá tú cuenta"
    } else {
      this.label = "Deshabiltá temporalmente tú cuenta"
      this.action = "Congelar"
    }
  }

  change(e: any) {
    console.log(e)
    if (this.freeze) {
      // const dialogRef = this.dialog.open(ConfirmDialogComponent);
      // dialogRef.afterClosed().subscribe(response => {
      //   console.log('response ', response);
      //   if (!response) {
      //     this.freeze = !this.freeze;
      //   } else {
      //     e.source.checked = true;
      //     this.label = "Rehabilitá tú cuenta"
      //     this.action = "Descongelar"
      //     this.updateEstado()
      //   }

      // })
    } else {
      console.log("entro por else")
      this.label = "Deshabilitá temporalmente tú cuenta"
      this.action = "Congelar"
      this.updateEstado()
    }

  }

  updateEstado() {
    // let actual = this.entidadService.entidadActual.freeze == 1
    // if (this.freeze != actual) {
    //   let entidadEstado = new EntidadEstadoDto()
    //   entidadEstado.entidadId = this.entidadService.entidadActual.entidadId
    //   entidadEstado.estado = this.freeze ? 1 : 0
      // this.entidadService.updateEstado(entidadEstado).subscribe(data => {
      //   this.entidadService.entidadActual = data
      // })
  //  }
  }
}
