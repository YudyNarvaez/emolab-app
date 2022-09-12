import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../constants/keys';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		private localStorageService: LocalStorageService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return from(this.handleToken(req, next))
	}


	async handleToken(req: HttpRequest<any>, next: HttpHandler){
		const tokenRaw = await this.localStorageService.getKeyValue(ACCESS_TOKEN_KEY)
		const token: any = JSON.parse(tokenRaw);
		let request = req;
		if (token) {
			request = req.clone({
				setHeaders: {
					authorization: `${token.token_type} ${ token.access_token }`
				}
			});
		}

		return await next.handle(request).toPromise();
	}

}