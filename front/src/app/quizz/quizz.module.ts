import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
	MatRadioModule,
	MatProgressSpinnerModule,
	MatButtonModule,
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { quizzRouting } from './quizz.routes';

import { QuizzComponent } from './quizz.component';
import { QuizzService } from '../services/quizz.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule,
		AngularFirestoreModule,

		quizzRouting,

		MatRadioModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
	declarations: [QuizzComponent],
	providers: [QuizzService],
})
export class QuizzModule {}
