import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { QuizzComponent } from './quizz.component';

const routes: Routes = [{ path: '', component: QuizzComponent }];

export const quizzRouting: ModuleWithProviders = RouterModule.forChild(routes);
