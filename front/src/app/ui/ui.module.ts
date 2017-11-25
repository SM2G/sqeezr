import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

import { UiComponent } from './ui.component';

@NgModule({
	imports: [CommonModule, MatToolbarModule, MatButtonModule],
	exports: [UiComponent],
	declarations: [UiComponent],
})
export class UiModule {}
