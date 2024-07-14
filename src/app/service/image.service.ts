import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private urlSubject = new BehaviorSubject<string>('');
  url$ = this.urlSubject.asObservable();

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string): void {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name);
    uploadBytes(imgRef, file)
      .then(response => {
        this.getImages();
      })
      .catch(error => console.error('Error uploading image:', error));
  }

  private getImages(): void {
    const imagesRef = ref(this.storage, 'imagen');
    list(imagesRef)
      .then(async response => {
        for (let item of response.items) {
          this.urlSubject.next(await getDownloadURL(item));
        }
      })
      .catch(error => console.error('Error getting images:', error));
  }
}
