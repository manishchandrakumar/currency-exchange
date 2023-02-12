import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setStorage(key: string, data: object) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getStorage(key: string): object {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  }

}
