import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeTR from '@angular/common/locales/tr';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {QuicklinkModule} from 'ngx-quicklink';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {LayoutModule} from './layout/layout.module';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {AlertService} from './_service/alert.service';
import {LanguageService} from './_service/language.service';

import {TokenInterceptor} from './_interceptor/token.interceptor';

registerLocaleData(localeTR);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    QuicklinkModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/lang/', '.json'),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AlertService,
    {
      provide: LOCALE_ID,
      useFactory: (languageService: LanguageService) => languageService.getCurrentCulture(),
      deps: [LanguageService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
