import { NgModule, APP_INITIALIZER, Injectable } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  LocalizationExtraModule,
  StorageStrategy,
  ProviderType,
  LogLevel,
  ISOCode
} from "angular-l10n";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

const l10nConfig: L10nConfig = {
  logger: {
    level: LogLevel.Warn
  },
  locale: {
    languages: [{ code: "en", dir: "ltr" }, { code: "fr", dir: "ltr" }],
    defaultLocale: { languageCode: "en", countryCode: "US" },
    currency: "USD",
    storage: StorageStrategy.Cookie
  },
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
      { type: ProviderType.Static, prefix: "./assets/l10n/" }
    ],
    caching: true,
    composedKeySeparator: ".",
    composedLanguage: [ISOCode.Language, ISOCode.Country]
  }
};


@Injectable()
export class InitConfig {
  constructor(private l10nLoader: L10nLoader) {}
  load() {
    return this.l10nLoader.load();
  }
}

export function initApp(initConfig: InitConfig) {
  return () => initConfig.load();
}


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LocalizationModule.forRoot(l10nConfig),
    LocalizationExtraModule
  ],
  declarations: [AppComponent, HelloComponent],
  providers: [
    InitConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [InitConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
