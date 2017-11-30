import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

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

		mainAppRouting,

		AngularFireModule.initializeApp(environment.firebase),
		MatButtonModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
