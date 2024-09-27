import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(private messageService: MessageService) {}

  // Método general para mostrar un mensaje
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  // Mostrar mensaje de éxito
  showSuccess(detail: string, summary: string = 'Success') {
    this.showMessage('success', summary, detail);
  }

  // Mostrar mensaje de información
  showInfo(detail: string, summary: string = 'Info') {
    this.showMessage('info', summary, detail);
  }

  // Mostrar advertencia
  showWarn(detail: string, summary: string = 'Warning') {
    this.showMessage('warn', summary, detail);
  }

  // Mostrar error
  showError(detail: string, summary: string = 'Error') {
    this.showMessage('error', summary, detail);
  }
}
