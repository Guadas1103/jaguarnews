import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../api-rest.service';
import { Router } from '@angular/router';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticiasConImagenes: any[] = [];
  mensaje: string = '';

  constructor(private api: ApiRestService) {}

  ngOnInit(): void {
    this.consulta();
  }

  consulta() {
    this.api.getAllNews().subscribe({
      next: datos => {
        let i = 1;
        const documents = datos.documents.filter((p: any) => p.hasOwnProperty("fields"));
        
        // Formateamos los datos
        this.noticiasConImagenes = documents.map((p: { name: String, fields: any }) => ({
          noticiaConImagen: {
            id: p.name.split("/").pop(),
            autor: p.fields.hasOwnProperty('autor') ? p.fields.autor.stringValue : "",
            titulo: p.fields.hasOwnProperty('titulo') ? p.fields.titulo.stringValue : "",
            descripcion: p.fields.hasOwnProperty('descripcion') ? p.fields.descripcion.stringValue : "",
            fecha: p.fields.hasOwnProperty('fecha') ? p.fields.timestampValue : "",
            fechaModificacion: p.fields.hasOwnProperty('fechaModificacion') ? p.fields.timestampValue : "",
            categoria: p.fields.hasOwnProperty('categoria') ? p.fields.categoria.stringValue : "",
            imagenUrl: p.fields.hasOwnProperty('imagenUrl') ? p.fields.imagenUrl.stringValue : "",
          }
        }));

        // Verificamos si hay noticias
        if (this.noticiasConImagenes.length === 0) {
          this.mensaje = 'No se han subido noticias.';
        }
      },
      error: e => {
        console.error("Error al obtener Noticias:", e);
      }
    });
  }
}