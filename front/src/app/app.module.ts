import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {
	MatButtonModule,
	MatInputModule,
	MatTableModule,
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CdkTableModule } from '@angular/cdk/table';

import { UiModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScoresComponent } from './scores/scores.component';

import { UserService } from './services/user.service';

import { mainAppRouting } from './app.routes';
import { CanActivateQuizz } from './guards/canActivateQuizz';

import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent, HomeComponent, ScoresComponent],
	imports: [
		BrowserAnimationsModule,
		RouterModule,
		UiModule,
		FormsModule,
		ReactiveFormsModule,

		mainAppRouting,

		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,

		MatButtonModule,
		MatInputModule,
		MatTableModule,

		CdkTableModule,
	],
	providers: [FormBuilder, CanActivateQuizz, UserService],
	bootstrap: [AppComponent],
})
export class AppModule {}
