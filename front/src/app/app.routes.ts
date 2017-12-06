import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ScoresComponent } from './scores/scores.component';

import { CanActivateQuizz } from './guards/canActivateQuizz';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{
		path: 'scores',
		component: ScoresComponent,
	},
	{
		path: 'quizz',
		loadChildren: './quizz/quizz.module#QuizzModule',
		canActivate: [CanActivateQuizz],
	},
];

export const mainAppRouting = RouterModule.forRoot(routes);
