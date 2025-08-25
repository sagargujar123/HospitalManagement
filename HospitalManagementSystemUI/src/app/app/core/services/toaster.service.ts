import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToasterMessage {
  type: 'success' | 'error';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasterSubject = new Subject<ToasterMessage>();
  toasterState = this.toasterSubject.asObservable();

  success(message: string) {
    this.toasterSubject.next({ type: 'success', text: message });
  }

  error(message: string) {
    this.toasterSubject.next({ type: 'error', text: message });
  }
}
