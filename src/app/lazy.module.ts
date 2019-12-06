import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  LocalizationExtraModule,
  ProviderType,
  ISOCode
} from 'angular-l10n';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { LazyChildComponent } from './lazy-child.component';

const l10nConfig: L10nConfig = {
  translation: {
    providers: [
      {
        type: ProviderType.Fallback,
        prefix: "./assets/l10n/global",
        fallbackLanguage: []
      },
      {
        type: ProviderType.Fallback,
        prefix: "./assets/l10n/",
        fallbackLanguage: [ISOCode.Language]
      },
      { type: ProviderType.Static, prefix: "./assets/l10n/" },
      {
        type: ProviderType.Fallback,
        prefix: "./assets/l10n/lazy/",
        fallbackLanguage: [ISOCode.Language]
      },
      { type: ProviderType.Static, prefix: "./assets/l10n/lazy/" }
    ],
    caching: true,
    composedKeySeparator: '.',
    composedLanguage: [ISOCode.Language, ISOCode.Country]
  }
};

@NgModule({
  declarations: [
    LazyComponent,
    LazyChildComponent
  ],
  imports: [
    CommonModule,
    LazyRoutingModule,
    LocalizationModule.forChild(l10nConfig),
    LocalizationExtraModule
  ]
})
export class LazyModule {
  constructor(
    public l10nLoader: L10nLoader
  ) {
    console.log('LazyModule: constructor')
    this.l10nLoader.load().then(() => console.log('LazyModule: translations loaded'));
  }
}
