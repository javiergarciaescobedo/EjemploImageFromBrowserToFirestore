import { Component } from '@angular/core';

import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  inDesktop: boolean = false;

  constructor(private firestoreService: FirestoreService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public platform: Platform) {      
      if (this.platform.is('desktop')) {
        this.inDesktop = true;
      }
    }

  onClickImageSelecButton(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvt: any) => {
      let result = readerEvt.target.result;
      this.guardarImagen(result);
    };
  }

  async guardarImagen(imagenBase64) {
    // Mensaje de espera mientras se sube la imagen
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    // Mensaje de finalización de subida de la imagen
    const toast = await this.toastController.create({
      message: 'Image was updated successfully',
      duration: 3000
    });

    // Carpeta del Storage donde se almacenará la imagen
    let nombreCarpeta = "imagenes";
    // Asignar el nombre de la imagen en función de la hora actual para
    //  evitar duplicidades de nombres
    let nombreImagen = new Date().getTime().toString();
    // Mostrar el mensaje de espera
    loading.present();
    // Llamar al método que sube la imagen al Storage
    this.firestoreService.uploadImage(nombreCarpeta, nombreImagen, imagenBase64)
    .then(snapshot => {
      snapshot.ref.getDownloadURL()
      .then(downloadURL => {
        // En la variable downloadURL se tiene la dirección de descarga de la imagen
        console.log("downloadURL:" + downloadURL);
        // Mostrar el mensaje de finalización de la subida
        toast.present();
        // Ocultar mensaje de espera
        loading.dismiss();
      })
    })
 }

}
