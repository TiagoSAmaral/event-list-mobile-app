import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import ExceptionMessages from './exception.messages';
import { close } from 'ionicons/icons'
import { addIcons } from 'ionicons';

// const errorInterceptor: HttpInterceptorFn = (req, next) =>  {
const errorInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const DEFAULT_TIMEOUT = 15000; // 15 Segundos
    const toastController = inject(ToastController);
    addIcons({close});

    return next(req).pipe(
        timeout(DEFAULT_TIMEOUT),

        catchError(error => {

        let errorMessage = 'Unknown Error'
        let showToast = true;

        switch (error.status) {
            case 0: 
                errorMessage =  ExceptionMessages.NO_CONNECT_SERVER;
                break;
                
            case 400: 
                showToast = false
                errorMessage = getValidationErrors(error);
                break;

            case 401:
                errorMessage = ExceptionMessages.NOT_AUTHORIZED;
                break;
            
            case 403:
                errorMessage = ExceptionMessages.ACCESS_DENIED;
                break;
            
            case 404:
                errorMessage = ExceptionMessages.NOT_FOUND;
                break;

            case 500:
                errorMessage = ExceptionMessages.SERVER_ERROR;
                break;

            case 503:
                errorMessage =  ExceptionMessages.SERVICE_UNAVAILABLE;
                break;
            
            default: 
                if (error.name == 'TimeoutError') {
                    errorMessage = ExceptionMessages.REQUEST_TIME_OUT;
                }
                break;
        }

        if (showToast) {
            showErrorToast(toastController, errorMessage);
        }
        
        return throwError( () => error )
    })
  )
}

const getValidationErrors = (error: HttpErrorResponse): string => {
  if (error.error?.errors) {
    const validationErrors = error.error.errors;
    const allErrors: string[] = [];

    Object.values(validationErrors).forEach(errorArray => {
      if (Array.isArray(errorArray)) {
        errorArray.forEach(errorMsg => {
          if (typeof errorMsg === 'string') {
            allErrors.push(errorMsg);
          }
        });
      } else if (typeof errorArray === 'string') {
        allErrors.push(errorArray);
      }
    });

    return allErrors.join(', ');
  }
  return error.error?.message || 'Dados inválidos';
};

  const  handleUnauthorized = async () => {
    /*
        1 - Limpa armazenamento local para remover tokens ou outros autenticadores invalidos.

        2 - Após limpeza redireciona para tela de login.

        3 - Exibe alerta informando que a sessão expirou e que faça login novamente.
        */
}

const showErrorToast = async (toastController: ToastController, message: string) => {
    const toast = await toastController.create({
        message: message,
        duration: 3000,
        position: 'bottom',
        color: 'danger',
        buttons: [ { icon: 'close', role: 'cancel' } ]
    });
    await toast.present();
}


export default errorInterceptor;