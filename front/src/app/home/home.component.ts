import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from '../models/user.model';

@Component({
	selector: 'sq-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public credentials: FormGroup;

	constructor(private _formBuilder: FormBuilder, private _router: Router) {
		this._initForm();
	}

	ngOnInit() {
		localStorage.clear();
	}

	public startQuizz(): void {
		const user = {
			...this.credentials.value,
		} as IUser;

		localStorage.setItem('name', user.name);
		localStorage.setItem('mail', user.mail);
		this._router.navigate(['/quizz']);
	}

	private _initForm(): void {
		this.credentials = this._formBuilder.group({
			name: this._formBuilder.control(null, [Validators.required]),
			mail: this._formBuilder.control(null, [
				Validators.required,
				Validators.email,
			]),
		});
	}
}
