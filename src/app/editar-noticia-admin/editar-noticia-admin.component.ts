import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../servicios/auth.service'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
<<<<<<<<< Temporary merge branch 1
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
=========
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
>>>>>>>>> Temporary merge branch 2
import { environment } from '../environment';

export interface Noticia {
  autor: string;
  descripcion: string;
  titulo: string;
  categoria: string;
  imagenURL: string;
  fecha: Date;
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
    correoUsuario: string = '';
  ngOnInit():void {
    this.authService.getUserDetails().subscribe(user => {
      if (user && user.email) {
        this.correoUsuario = user.email;
      }
    });
      // Si el usuario está autenticado, realiza la consulta u otras operaciones necesarias
      this.consulta();
  }
  obtenerURLImagen(noticiaId: string): Observable<string> {
    const storagePath = `noticias/${noticiaId.toLowerCase()}/`;
    const imagenPath = `${storagePath}${noticiaId}.jpg`;
    const storageRef = this.storage.ref(imagenPath);
  
    return storageRef.getDownloadURL();
  }

  onImagenSeleccionada(event: any): void {
    const archivo = event.target.files[0];
  
    if (archivo) {
      this.selectedImage = archivo;
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => {
        this.modP.imagenURL = lector.result as string;
      };
    }
  
    // Limpiar el input de selección de imagen
    event.target.value = null;
  }
  
  
  noticias = [
    {no:1, autor: '¿Cuál?', descripcion:"", fecha:"", titulo:"", id:"", categoria:""},

      
  ]
  newP={autor:"", descripcion:"", titulo:"", categoria:"", imagenURL:""}
  modP={autor:"", descripcion:"", titulo:"", fecha:"", id:"", categoria:"", imagenURL:""}
  
  verN={id:"", autor:"", descripcion:"", titulo:"", imagenURL:"", categoria:""}
  
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

  nombreDocumentoSinContador(categoria: string, noticiaId: string): string {
    // Puedes ajustar la lógica según tus necesidades
    // Aquí simplemente estoy utilizando el ID de la noticia como nombre del documento
    return noticiaId;
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
          id: id, // Usar el nombre del documento como id
          categoria: docData.categoria || ""
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
    // Obtener el correo del usuario actual desde el servicio de autenticación
    this.authService.getUserDetails().subscribe(user => {
      const correo = user?.email || "";
      const fecha = new Date().toISOString();
  
      if (this.newP.descripcion == "" || this.newP.titulo == "") {
        alert("Debes escribir la descripción y seleccionar el autor");
        return;
      }
  
      if (!this.selectedImage) {
        alert("Debes seleccionar una imagen");
        return;
      }
  
      const nombreDocumento = this.generarNombreDocumento(this.newP.categoria);
      const categoria = this.newP.categoria.toLowerCase();
  
      // Subir la imagen al Storage
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
              autor: correo, // Utilizar el correo del usuario loggeado como autor
              descripcion: this.newP.descripcion,
              fecha: new Date(),
              titulo: this.newP.titulo,
              imagenURL: fullPath, // Añadir la URL de la imagen
              categoria: this.newP.categoria
            })
            .then(() => {
              // Operaciones después de guardar la noticia con éxito
              console.log('Noticia creada con éxito');
              this.consulta();
  
              // Restablecer los valores a valores iniciales o vacíos
              this.newP = { autor: '', descripcion: '', titulo: '', categoria: 'General', imagenURL: ''  };
            })
            .catch(error => {
              // Manejo de errores al guardar la noticia
              console.error('Error al crear la noticia:', error);
              alert('Error al crear la noticia. Por favor, inténtalo de nuevo.');
            });
          });
        })
      ).subscribe();
    });
  }

  borrarNoticia(id: string) {
    const confirmacion = window.confirm("¿Estás seguro de querer eliminar esta noticia?");
    
    if (!confirmacion) {
      // El usuario canceló la eliminación
      return;
    }
  
    // Obtener la URL de la imagen de la noticia
    this.firestore.collection('noticias').doc(id).get().subscribe(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data() as Noticia;
        const imagenURL = data.imagenURL;
  
        // Eliminar la noticia
        this.firestore.collection('noticias').doc(id).delete().then(() => {
          console.log('Noticia eliminada con éxito');
  
          // Eliminar la imagen del almacenamiento
          this.eliminarImagenAlmacenamiento(imagenURL);
  
          // Realizar otras operaciones después de eliminar la noticia
          this.consulta();
        }).catch(error => {
          console.error('Error al eliminar la noticia:', error);
          // Manejar el error si es necesario
        });
      } else {
        console.log('No se encontró la noticia con el ID:', id);
      }
    });
  }
  
  private eliminarImagenAlmacenamiento(imagenURL: string) {
    const storageRef = this.storage.ref(imagenURL);
  
    // Eliminar la imagen del almacenamiento
    storageRef.delete().subscribe(
      () => {
        console.log('Imagen eliminada con éxito');
      },
      error => {
        console.error('Error al eliminar la imagen:', error);
        // Manejar el error si es necesario
      }
    );
  }

  
  
  verNoticia(noticiaId: string) {
    debugger;
    console.log('Iniciando verNoticia para:', noticiaId);
  
    const correo = localStorage.getItem("correo");
  
    if (!correo) {
      console.error('No se encontró el correo en localStorage.');
      return;
    }
  
    console.log('Correo encontrado:', correo);
  
    this.firestore.collection('noticias').doc(noticiaId).get().subscribe(
      snapshot => {
        console.log('Snapshot obtenido:', snapshot);
  
        if (snapshot.exists) {
          const data = snapshot.data() as Noticia;
          console.log('Datos de la noticia:', data);
  
          if (data) {
            const categoria = noticiaId.toLowerCase();
            console.log('Categoría de la noticia:', categoria);
  
            const storagePath = `noticias/${data.categoria}/`;
            const imagenPath = `${storagePath}${noticiaId}.jpg`;
            console.log('Ruta de la imagen:', imagenPath);
  
            const decodedImagenPath = decodeURIComponent(imagenPath);
            console.log('Ruta de la imagen después de decodificar:', decodedImagenPath);
  
            const storageRef = this.storage.ref(decodedImagenPath);
  
            // Obtener la URL de la imagen
            storageRef.getDownloadURL().subscribe(
              imagenURL => {
                console.log('URL de la imagen:', imagenURL);
  
                // Mostrar la imagen en tu interfaz de usuario (puedes usar esta URL en tu HTML)
                this.verN = {
                  id: noticiaId,
                  autor: correo,
                  descripcion: data.descripcion,
                  titulo: data.titulo,
                  imagenURL: imagenURL,
                  categoria: data.categoria
                };
  
                console.log('Datos de verN antes de abrir el modal:', this.verN);
  
                // Abre el modal
                this.modalService.open({ size: "lg", centered: true });
              },
              error => {
                console.error('Error al obtener la URL de la imagen:', error);
              }
            );
          }
        } else {
          console.log('No se encontró la noticia con el ID:', noticiaId);
        }
      },
      error => {
        console.error('Error al obtener el documento de la noticia:', error);
      }
    );
  }
testConsole() {
  console.log('Datos de verN en HTML:', this.verN);
}
noticiaModificada: boolean = false;
modificarNoticia() {
  debugger;
  const confirmacion = window.confirm("¿Estás seguro de querer modificar esta noticia?");

  if (confirmacion) {
    // Verificar si se seleccionó una nueva imagen
    if (this.selectedImage) {
      // Subir la nueva imagen al Storage y actualizar la noticia
      const storagePath = `noticias/${this.modP.categoria}/`;
      const imagenPath = `${storagePath}${this.modP.id}.jpg`;
      const storageRef = this.storage.ref(imagenPath);
      const task = this.storage.upload(imagenPath, this.selectedImage);

      // Escuchar los eventos de progreso y finalización de la carga
      task.snapshotChanges().pipe(
        finalize(() => {
          // Obtener la URL de la imagen después de cargar
          storageRef.getDownloadURL().subscribe(url => {
            // Actualizar la noticia en Firestore con la nueva URL de la imagen
            this.actualizarNoticia(url);
            this.noticiaModificada = true;

            // Cerrar el modal después de la modificación
            this.cerrarModal();
          });
        })
      ).subscribe();
    } else {
      // No se seleccionó una nueva imagen, solo actualizar la noticia en Firestore
      this.actualizarNoticia();

      this.noticiaModificada = true;
      // Cerrar el modal después de la modificación
      this.cerrarModal();
    }
  } else {
    // El usuario canceló la modificación
    console.log("Modificación cancelada por el usuario.");
  }
}

// Agrega declaraciones de consola para rastrear el flujo de ejecución
cerrarModal() {
  try {
    if (this.modalRef) {
      this.modalRef.close();
      this.noticiaModificada = false;
      console.log('Modal cerrado');
    }
  } catch (error) {
    console.error('Error al cerrar el modal:', error);
  }
}
private modalRef: NgbModalRef | null = null;
formValido(): boolean {
  return !!this.modP.titulo && !!this.modP.descripcion && !!this.modP.imagenURL;
}

private actualizarNoticia(imagenURL?: string) {
  // Construir el objeto con las propiedades actualizadas de la noticia
  const updatedNoticia: any = {
    titulo: this.modP.titulo,
    descripcion: this.modP.descripcion,
    imagenURL: this.modP.imagenURL
  };

  // Agregar la URL de la nueva imagen si está presente
  if (imagenURL) {
    // Puedes almacenar solo la ruta relativa
    const storagePath = `noticias/${this.modP.categoria}/`;
    const imagenPath = `${storagePath}${this.modP.id}.jpg`;
    updatedNoticia.imagenURL = imagenPath;
  }

  // Actualizar la noticia en Firestore
  this.firestore.collection('noticias').doc(this.modP.id).update(updatedNoticia)
    .then(() => {
      console.log('Noticia modificada con éxito');
      this.consulta();

      // Cerrar el modal después de la modificación
      this.modalService.dismissAll();
    })
    .catch(error => {
      console.error('Error al modificar la noticia:', error);
      // Manejar el error si es necesario
    })
    .finally(() => {
      console.log('Finalizando la actualización de la noticia');
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
