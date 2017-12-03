import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CanActivateQuizz } from './guards/canActivateQuizz';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{
		path: 'quizz',
		loadChildren: './quizz/quizz.module#QuizzModule',
		canActivate: [CanActivateQuizz],
	},
];

export const mainAppRouting = RouterModule.forRoot(routes);
