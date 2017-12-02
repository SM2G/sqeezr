import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';

import { UiModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { mainAppRouting } from './app.routes';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		BrowserAnimationsModule,
		RouterModule,
		UiModule,
		FormsModule,
		ReactiveFormsModule,

		mainAppRouting,

		AngularFireModule.initializeApp(environment.firebase),
		MatButtonModule,
		MatInputModule,
	],
	providers: [FormBuilder],
	bootstrap: [AppComponent],
})
export class AppModule {}
