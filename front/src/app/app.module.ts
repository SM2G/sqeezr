import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { mainAppRouting } from './app.routes';

@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [BrowserModule, RouterModule, UiModule, mainAppRouting],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
