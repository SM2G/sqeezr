import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { QuizzComponent } from './quizz.component';
import { StatsComponent } from './stats/stats/stats.component';

const routes: Routes = [
	{ path: '', component: QuizzComponent },
	{ path: 'stats', component: StatsComponent },
];

export const quizzRouting: ModuleWithProviders = RouterModule.forChild(routes);
