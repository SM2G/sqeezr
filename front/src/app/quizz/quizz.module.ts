import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
	MatRadioModule,
	MatProgressSpinnerModule,
	MatButtonModule,
	MatExpansionModule,
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { quizzRouting } from './quizz.routes';

import { QuizzService } from '../services/quizz.service';

import { QuizzComponent } from './quizz.component';
import { StatsComponent } from './stats/stats/stats.component';

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
		MatExpansionModule,
	],
	providers: [QuizzService],
	declarations: [QuizzComponent, StatsComponent],
})
export class QuizzModule {}
