import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  pure: false
})
export class ErrorMessagePipe implements PipeTransform {

  transform(control: AbstractControl | null, ...args: unknown[]): any {
    console.log(control)
    if (control?.hasError('required')) {      
      return 'Este campo es obligatorio';
    }

    if (!control?.hasError('required') && control?.hasError('email')) {
      return 'El email es inválido.';
    }

    if (!control?.hasError('required') && control?.hasError('pattern')) {
      return 'El email es inválido.';
    }

    if (!control?.hasError('required') && control?.hasError('minlength')) {
      return `Debe ingresar mínimo ${control.errors.minlength.requiredLength} caracteres`;
    }

    if (!control?.hasError('required') && control?.hasError('maxlenght')) {
      return `El máximo de caracteres es ${control.errors.minLength.requiredLength}`;
    }

  }

}
