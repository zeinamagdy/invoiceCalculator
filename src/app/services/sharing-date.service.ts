import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharingDateService {

  set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  clear(key: string) {
    localStorage.removeItem(key);
  }

  cleanAll() {
    localStorage.clear();
  }
}
