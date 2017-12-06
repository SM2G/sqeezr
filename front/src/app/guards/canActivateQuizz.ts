import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class CanActivateQuizz implements CanActivate {
	constructor(private _router: Router) {}

	public canActivate(): boolean {
		const hasCredentials =
			localStorage.getItem('mail') && localStorage.getItem('name');

		if (hasCredentials) return true;
		this._router.navigate(['/home']);
		return false;
	}
}
