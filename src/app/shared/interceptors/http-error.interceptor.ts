import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../services/toast/toast.service';



@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastService: ToastService
    ){

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => { 
        const errorMessage = this.getErrorMessage(error)
        this.toastService.showError(errorMessage)
        return throwError(() => new Error(errorMessage))
      })
    );    
  }

  getErrorMessage(error: HttpErrorResponse){
    
    let errorMessage = 'Ha ocurrido un error inesperado';

    //Pydantic server entity validation error
    if (error.status == 422){
      errorMessage = `${error.error.detail[0].msg}`;
      return errorMessage;
    }

    // Forbidden
    if (error.status == 401) {
      errorMessage = `No tienes los privilegios suficientes`;
      return errorMessage;
    }

    //Unauthorized
    if (error.status == 403) {
      errorMessage = `No estás autorizado`;
      return errorMessage;
    }

    //Clotheme API Error
    if (error.status == 400) {
      errorMessage = error.error.detail;
      return errorMessage;
    }

    //Internal server error
    if (error.status >= 500) {
      errorMessage = `Ha ocurrido un error en el servidor`;
      return errorMessage;
    }

    return errorMessage;
  }
}