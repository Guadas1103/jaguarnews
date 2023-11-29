import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../servicios/auth.service'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../environment';

export interface Noticia {
  autor: string;
  descripcion: string;
  titulo: string;
  categoria: string;
  imagenURL: string;
  // Añade otros campos según sea necesario
}

@Component({
  selector: 'app-editar-noticia-admin',
  templateUrl: './editar-noticia-admin.component.html',
  styleUrls: ['./editar-noticia-admin.component.css']
})

export class EditarNoticiaAdminComponent {
  
  constructor(private api: ApiRestService, 
    private router: Router, private firestore: AngularFirestore, 
    private authService: AuthService, private storage: AngularFireStorage, private modalService: NgbModal ){}
    
  ngOnInit():void {
    this.consulta()
  }
  
  
  noticias = [
    {no:1, autor: '¿Cuál?', descripcion:"", fecha:"", titulo:"", id:""},
   
  ]
  newP={autor:"", descripcion:"", titulo:"", categoria:""}
  modP={autor:"", descripcion:"", titulo:"", fecha:"", id:"", categoria:"", imagenURL:""}
  verN={id:"", autor:"", descripcion:"", titulo:"", imagenURL:""}
  
   // Objeto para rastrear el número de noticias en cada categoría
   contadorNoticias: { [categoria: string]: number } = {
    'General': 0,
    'Tic´s': 0,
    'Nanotecnologia': 0,
    'Mecatronica': 0,
    'Sistemas': 0
  };

  // Función para generar el nombre del documento
  generarNombreDocumento(categoria: string): string {
    // Obtener el contador actual almacenado en localStorage
    const storedCount = localStorage.getItem(`contador_${categoria}`);
    let count = 1;
  
    if (storedCount) {
      // Si hay un contador almacenado, usarlo y actualizarlo
      count = parseInt(storedCount) + 1;
    }
  
    // Almacenar el nuevo contador en localStorage
    localStorage.setItem(`contador_${categoria}`, count.toString());
  
    return `${categoria}${count.toString().padStart(2, '0')}`;
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
          id: id // Usar el nombre del documento como id
        };
      });
      console.log(this.noticias);
    });
  }


  selectedImage: File | null = null;

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedImage = file;
    
  }
  
  crearNoticia() {
    const correo = localStorage.getItem("correo") || "";
    const fecha = new Date().toISOString();
  
    if (this.newP.descripcion == "" || this.newP.titulo == "") {
      alert("Debes escribir la descripción y seleccionar el autor");
      return;
    }
  
    const nombreDocumento = this.generarNombreDocumento(this.newP.categoria);
    const categoria = this.newP.categoria.toLowerCase();
  
    // Subir la imagen al Storage
    if (this.selectedImage) {
      const storagePath = `noticias/${categoria}/`; // Carpeta donde se almacenarán las imágenes
      const imagenPath = `${storagePath}${nombreDocumento}.jpg`;
      const storageRef = this.storage.ref(imagenPath);
      const task = storageRef.put(this.selectedImage);
  
      // Escuchar los eventos de progreso y finalización de la carga
      task.snapshotChanges().pipe(
        finalize(() => {
          // Obtener la URL de la imagen después de cargar
          storageRef.getMetadata().subscribe(metadata => {
            const fullPath = metadata.fullPath;
            // Guardar la noticia en Firestore con la URL de la imagen
            this.firestore.collection('noticias').doc(nombreDocumento).set({
              autor: correo,
              descripcion: this.newP.descripcion,
              fecha: new Date(),
              titulo: this.newP.titulo,
              imagenURL: fullPath // Añadir la URL de la imagen
            })
            .then(() => {
              // Operaciones después de guardar la noticia con éxito
              console.log('Noticia creada con éxito');
              this.consulta();
  
              // Restablecer los valores a valores iniciales o vacíos
              this.newP = { autor: '', descripcion: '', titulo: '', categoria: 'General' };
            })
            .catch(error => {
              // Manejo de errores al guardar la noticia
              console.error('Error al crear la noticia:', error);
              alert('Error al crear la noticia. Por favor, inténtalo de nuevo.');
            });
          });
        })
      ).subscribe();
    } else {
      // Si no hay imagen seleccionada, solo guardar la noticia sin imagen
      this.firestore.collection('noticias').doc(nombreDocumento).set({
        autor: correo,
        descripcion: this.newP.descripcion,
        fecha: new Date(),
        titulo: this.newP.titulo,
        // Otros campos que desees incluir...
      })
      .then(() => {
        // Operaciones después de guardar la noticia con éxito
        console.log('Noticia creada con éxito');
        this.consulta();
  
        // Restablecer los valores a valores iniciales o vacíos
        this.newP = { autor: '', descripcion: '', titulo: '', categoria: 'General' };
      })
      .catch(error => {
        // Manejo de errores al guardar la noticia
        console.error('Error al crear la noticia:', error);
        alert('Error al crear la noticia. Por favor, inténtalo de nuevo.');
      });
    }
  }

  borrarNoticia(id: string) {
    const confirmacion = window.confirm("¿Estás seguro de querer eliminar esta noticia?");
  
  if (!confirmacion) {
    // El usuario canceló la eliminación
    return;
  }
    this.firestore.collection('noticias').doc(id).delete().then(() => {
      console.log('Noticia eliminada con éxito');
      this.consulta();
    }).catch(error => {
      console.error('Error al eliminar la noticia:', error);
      // Manejar el error si es necesario
    });
  }

  
  
  verNoticia(noticiaId: string) {
   
    console.log('Iniciando verNoticia para:', noticiaId);
  
    const correo = localStorage.getItem("correo");
  
    if (!correo) {
      console.error('No se encontró el correo en localStorage.');
      return;
    }
  
    console.log('Correo encontrado:', correo);
  
    this.firestore.collection('noticias').doc(noticiaId).get().subscribe(snapshot => {
      console.log('Snapshot obtenido:', snapshot);
  
      if (snapshot.exists) {
        const data = snapshot.data() as Noticia;
        console.log('Datos de la noticia:', data);
  
        if (data && data.categoria) {
          const categoria = data.categoria.toLowerCase();
          console.log('Categoría de la noticia:', categoria);
  
          const storagePath = `noticias/${categoria}/`;
          const imagenPath = `${storagePath}${noticiaId}.jpg`;
          console.log('Ruta de la imagen:', imagenPath);
  
          const storageRef = this.storage.ref(imagenPath);
  
          storageRef.getMetadata().subscribe(metadata => {
            console.log('Metadatos de la imagen:', metadata);
  
            const fullPath = metadata.fullPath;
            console.log('Ruta completa de la imagen:', fullPath);
  
            // Construir la URL completa de la imagen
            const storageBaseUrl = 'https://storage.googleapis.com/';
            const imagenURLCompleta = storageBaseUrl + encodeURIComponent(environment.firebase.storageBucket) + '/' + encodeURIComponent(fullPath);
  
            this.verN = {
              id: noticiaId,
              autor: correo,
              descripcion: data.descripcion,
              titulo: data.titulo,
              imagenURL: imagenURLCompleta
            };
  
            console.log('Datos de verN antes de abrir el modal:', this.verN);
  
            this.modalService.open("leerMas", { size: "lg", centered: true });
          });
        }
      } else {
        console.log('No se encontró la noticia con el ID:', noticiaId);
      }
    });
  }
testConsole() {
  console.log('Datos de verN en HTML:', this.verN);
}
  modificarNoticia() {
  const confirmacion = window.confirm("¿Estás seguro de querer modificar esta noticia?");

  if (!confirmacion) {
    // El usuario canceló la modificación
    return;
  }

  // Verificar si se seleccionó una nueva imagen
  if (this.selectedImage) {
    // Subir la nueva imagen al Storage y actualizar la noticia
    const storagePath = `noticias/${this.modP.categoria}/`;
    const imagenPath = `${storagePath}${this.modP.id}.jpg`;
    const storageRef = this.storage.ref(imagenPath);
    const task = storageRef.put(this.selectedImage);

    // Escuchar los eventos de progreso y finalización de la carga
    task.snapshotChanges().pipe(
      finalize(() => {
        // Obtener la URL de la imagen después de cargar
        storageRef.getDownloadURL().subscribe(url => {
          // Actualizar la noticia en Firestore con la nueva URL de la imagen
          this.actualizarNoticia(url);
        });
      })
    ).subscribe();
  } else {
    // No se seleccionó una nueva imagen, solo actualizar la noticia en Firestore
    this.actualizarNoticia();
  }
}

private actualizarNoticia(imagenURL?: string) {
  // Construir el objeto con las propiedades actualizadas de la noticia
  const updatedNoticia: any = {
    titulo: this.modP.titulo,
    descripcion: this.modP.descripcion,
  };

  // Agregar la URL de la nueva imagen si está presente
  if (imagenURL) {
    updatedNoticia.imagenURL = imagenURL;
  }

  // Actualizar la noticia en Firestore
  this.firestore.collection('noticias').doc(this.modP.id).update(updatedNoticia)
    .then(() => {
      console.log('Noticia modificada con éxito');
      this.consulta();
    })
    .catch(error => {
      console.error('Error al modificar la noticia:', error);
      // Manejar el error si es necesario
    });
}
  editarNoticia(p:any){
    this.modP = JSON.parse(JSON.stringify(p));
  }


  
  navigateToHome() {
    this.router.navigate(['/home-admin']);
  }
  navigateToUsuario() {
    this.router.navigate(['/crear-usuario-admin']);
  }
  navigateToEditar() {
    this.router.navigate(['/editar-noticia-admin']);
  }
}
