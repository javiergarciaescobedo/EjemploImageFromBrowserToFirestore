import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFireStorage: AngularFireStorage) { }

  public uploadImage(nombreCarpeta, nombreArchivo, imagenBase64){
    let storageRef = this.angularFireStorage.ref(nombreCarpeta).child(nombreArchivo);
    return storageRef.putString(imagenBase64, 'data_url');
  }

  public deleteFileFromURL(fileURL) {
    return this.angularFireStorage.storage.refFromURL(fileURL).delete();
  }

}
