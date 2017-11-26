import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'quizz', loadChildren: './quizz/quizz.module#QuizzModule' },
];

export const mainAppRouting = RouterModule.forRoot(routes);
