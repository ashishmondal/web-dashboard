import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';

@NgModule({
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'web-dashboard',
      storageType: 'localStorage'
    }),
    CommonModule,
    FormsModule
  ],
  providers: [LocalStorageService],
  exports: [SettingsComponent],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
