import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  [x: string]: any;
urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3v3gqTlJWer6GNopRrBxqZB1PnYc8qbQ";
urlRegister = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3v3gqTlJWer6GNopRrBxqZB1PnYc8qbQ";
url = "https://firestore.googleapis.com/v1/projects/jaguarnewsdb/databases/(default)/documents/"

constructor(private http: HttpClient) { }
    login(email: string, pass:string){

      return this.http.post(this.urlLogin, {email:email,password:pass,returnSecureToken:true})
    }
    register(email: string, pass:string){
  
      return this.http.post(this.urlRegister, {email:email,password:pass,returnSecureToken:true})
    }
    
    crateNoticia(autor:string, descripcion:string, fecha:string, titulo:string, categoria:string ){
      const newDoc ={"fields": {
        "autor": {
          "stringValue": autor
        },
        "descripcion": {
          "stringValue": descripcion
        },
        "fecha": {
          "timestampValue": fecha
        },
        "titulo": {
          "stringValue": titulo
        }
      }
    }
      return this.http.post(this.url + "noticias", newDoc)
    }
    updateNoticia( autor:string, descripcion:string, titulo:string, fecha:string, id:string, categoria:string){
      const newDoc ={"fields": {
       
        "autor": {
          "stringValue": autor
        },
        "descripcion": {
          "stringValue": descripcion
        },
        "titulo": {
          "stringValue": titulo
        },
        "fecha": {
          "timestampValue": fecha
        }
        
        
        
      }
    }
      return this.http.patch(this.url + "noticias/"+id+"?updateMask.fieldPaths=pregunta", newDoc )
    }
    deleteNoticia(id:string){
      return this.http.delete(this.url + "noticias/"+id)
    }

    getAllNews(){
      return this.http.get<any>(this.url + 'noticias');
    }
    formatDate(timestamp: any): string {
      // Implementa la lógica para formatear el timestamp según tus necesidades
      return timestamp;
    }

  
}
