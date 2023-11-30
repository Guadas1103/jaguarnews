import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/servicios/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

export interface Noticia {
  no: number;
  autor: string;
  descripcion: string;
  titulo: string;
  categoria: string;
  imagenURL: string;  // Nuevo campo para almacenar la URL de la imagen
  fecha: Date |null;
  id: string;  // Usar el nombre del documento como id
}

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {
  noticias: Noticia[] = [];
  verN: Noticia = { no: 0, id: "", autor: "", descripcion: "", titulo: "", imagenURL: "", categoria: "", fecha: null};
  mensaje = "";

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.consulta();
  }

  obtenerURLImagen(noticiaId: string, noticiaCategoria: string): Observable<string> {
    const storagePath = `noticias/${noticiaCategoria}/`;
    const imagenPath = `${storagePath}/${noticiaId}.jpg`;
    const storageRef = this.storage.ref(imagenPath);
  
    return storageRef.getDownloadURL();
  }

  consulta() {
    this.firestore.collection('noticias').snapshotChanges().subscribe(data => {
      let i = 1;
      this.noticias = data.map((p: any) => {
        const docData = p.payload.doc.data();
        const id = p.payload.doc.id;
        return {
          no: i++,
          autor: docData.autor || "",
          descripcion: docData.descripcion || "",
          fecha: docData.fecha ? docData.fecha.toDate() : null,
          titulo: docData.titulo || "",
          id: id,
          categoria: docData.categoria || "",
          imagenURL: ""
        };
      });
  
      if (this.noticias.length === 0) {
        this.mensaje = 'No se han subido noticias.';
      }
  
      // Crear un array de observables que obtengan las URLs de las imágenes
      const observables: Observable<string>[] = this.noticias.map(noticia => {
        return this.obtenerURLImagen(noticia.id, noticia.categoria);
      });
  
      // Usar forkJoin para esperar a que todas las URLs se carguen
      forkJoin(observables).subscribe(
        urls => {
          // Asignar las URLs a las noticias
          this.noticias.forEach((noticia, index) => {
            noticia.imagenURL = urls[index];
          });
        },
        error => {
          console.error('Error al obtener la URL de la imagen:', error);
        }
      );
    });
  }

  verNoticia(noticiaId: string) {
        // Obtener la noticia detallada utilizando el noticiaId
  this.firestore.collection('noticias').doc(noticiaId).get().subscribe(
    snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data() as Noticia;

        // Construir la URL de la imagen
        const storagePath = `noticias/${data.categoria}/`;
        const imagenPath = `${storagePath}${noticiaId}.jpg`;
        //const decodedImagenPath = decodeURIComponent(imagenPath);
        const storageRef = this.storage.ref(imagenPath);

        // Obtener la URL de la imagen
        storageRef.getDownloadURL().subscribe(
          imagenURL => {
            // Mostrar la información detallada de la noticia en algún lugar de tu interfaz
            this.verN = {
              no: 0,
              id: noticiaId,
              autor: data.autor,
              descripcion: data.descripcion,
              titulo: data.titulo,
              imagenURL: imagenURL,
              categoria: data.categoria,
              fecha: null
            };

          },
          error => {
            console.error('Error al obtener la URL de la imagen:', error);
          }
        );
      } else {
        console.log('No se encontró la noticia con el ID:', noticiaId);
      }
    },
    error => {
      console.error('Error al obtener el documento de la noticia:', error);
    }
  );
  }
}
