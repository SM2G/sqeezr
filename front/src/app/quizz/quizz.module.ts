import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuizzComponent } from './quizz.component';

import { quizzRouting } from './quizz.routes';

@NgModule({
	imports: [CommonModule, RouterModule, quizzRouting],
	declarations: [QuizzComponent],
})
export class QuizzModule {}
