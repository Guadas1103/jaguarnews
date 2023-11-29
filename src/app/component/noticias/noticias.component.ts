import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../api-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit{
  noticias = [
    {autor: '', titulo:'', descripcion:'', fecha:'', fechaModificacion:'', imagenUrl:''}
  ]
  // obetner imagenes
  images: string[] = [];

  constructor(private api: ApiRestService, private router: Router, private storage: Storage) {}
  
  ngOnInit():void {
      this.consulta()
  }

  consulta(){
    this.api.getAllNoticias().subscribe({
      next: datos => {
        //console.log(datos)
        let i = 1;  
        const documents = datos.documents.filter((p:any) => p.hasOwnProperty("fields"))
        console.log(documents)
        this.noticias = documents.map((p: {name: String, fields: any}) => (
          {
          autor: p.fields.hasOwnProperty('autor')? p.fields.autor.stringValue:"",
          titulo: p.fields.hasOwnProperty('titulo')? p.fields.titulo.stringValue:"",
          descripcion: p.fields.hasOwnProperty('descripcion')? p.fields.descripcion.stringValue:"",
          fecha: p.fields.hasOwnProperty('fecha')? p.fields.timestampValue:"",
          fechaModificacion: p.fields.hasOwnProperty('fechaModificacion')? p.fields.timestampValue:"",
          imagenUrl: p.fields.hasOwnProperty('imagenUrl')? p.fields.imagenUrl.stringValue:"",
        }))
        console.log(this.noticias)

      },
      error: e => {
        console.error("Error al obtener Noticias:", e);
      }
    });
  }
  
  
}
