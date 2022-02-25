import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyMessagge } from 'src/app/data/model/my-messagge';
import { environment } from 'src/environments/environment';

export interface smsDTO {
  "mensajes": [
    {
      "identificador": string
      "mensaje": string
      "telefono": number
    }
  ],
  "origen": string
}

export interface mailDTO {
  "content": string,
  "email": string,
  "subject": string
}

@Injectable({
  providedIn: 'root'
})
export class SendSmsService {

  sosUrl = 'http://mi-mensajeria.us-east-1.elasticbeanstalk.com/sms/auth'
  smsUrl = 'http://mi-mensajeria.us-east-1.elasticbeanstalk.com/sms/sendSMS'
  mailUrl = 'http://mi-mensajeria.us-east-1.elasticbeanstalk.com/email/send'
  
  baseUrl = environment.baseUrl;

  mensaje!: string;

  constructor(private http: HttpClient) {

   }

  sendMail(email: string, code: number): Observable<any> {

    let mail: mailDTO = {
      "content": `Nadie en dinamica te va a solicitar este dato. Por favor no lo compartas. Tu codigo de seguridad es:  ${code}`,
      "email": email,
      "subject": "Validacion de mail"
    }
    console.log(mail)
    return this.http.post(`${this.mailUrl}`, mail)

  }

  sendSMS(phone: number, code: number): Observable<any> {
  
     let sms: smsDTO = {
      "mensajes": [
        {
          "identificador": "0",
          "mensaje": `Nadie en dinamica te va a solicitar este dato. Por favor no lo compartas. Tu codigo de seguridad es:  ${code}`,
          "telefono": phone
        }
      ],
      "origen": "SMS_CORTO"
    }
    return this.http.post(`${this.smsUrl}`, sms)
  }

  activeSMS(): Observable<any> {
    console.log('en sos')
    return this.http.post(`${this.sosUrl}`, {"username": "midinamica", "password": "md692"})
  }
 
  getMensaje(codigo: string): Observable<MyMessagge> {
    return this.http.get<MyMessagge>(`${this.baseUrl}/mensajes/${codigo}`)
  }
}
