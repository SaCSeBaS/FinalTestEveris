import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const ErrorMessages = [
  {
    errorCode: "auth/invalid-email",
    message: "Por favor ingrese una dirección de correo electrónico válida.",
  },
  {
    errorCode: "auth/invalid-password",
    message:
      "Por favor ingrese una contraseña válida. Debe contener por lo menos 6 caracteres.",
  },
  {
    errorCode: "auth/email-already-exists",
    message:
      "Parece que esta dirección de correo electrónico ya está en uso. Puedes intentar con una diferente 😄.",
  },
  {
    errorCode: "auth/email-already-in-use",
    message:
      "Parece que esta dirección de correo electrónico ya está en uso. Puedes intentar con una diferente 😄.",
  },
  {
    errorCode: "auth/user-not-found",
    message: "Dirección de correo electrónico no válida o no estás registrado.",
  },
  {
    errorCode: "auth/wrong-password",
    message: "Contraseña incorrecta. Por favor, intente nuevamente.",
  },
];

type SourceFilter = 'email' | 'register';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private sourceTitle: string;

  constructor(private toast: ToastrService) {}

  handleAuth(err: any, source: SourceFilter) {
    let errorCode = ErrorMessages.find((i) => i.errorCode === err.code);

    let userFeedback = errorCode
      ? errorCode.message
      : 'Ups! Algo salió mal. Por favor, intenta nuevamente.';

    this.mkSourceTitle(source);

    this.toast.error(userFeedback, this.sourceTitle);
  }

  private mkSourceTitle(source: SourceFilter) {
    let defaultMessage = 'Error al ingresar';
    switch (source) {
      case 'email':
        this.sourceTitle = defaultMessage;
        break;
      case 'register':
        this.sourceTitle = 'No se pudo registrar';
        break;
      default:
        this.sourceTitle = defaultMessage;
        break;
    }
  }
}