import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { inputComponent } from './pages/components/input/input'
import { iconComponent } from './pages/components/icon/icon'
import { tagComponent } from './pages/components/tag/tag'
import { tagEditComponent } from './pages/components/tagEdit/tagEdit'
import { comComponent } from './pages/components/com/com'
import { numberDirective, moneyDirective, thousandsDirective } from './app.directive'

import { navComponent } from './component/nav/nav'
import { removeComponent } from './component/removeTag/removeTag'
import { mediaComponent } from './component/upload/media/media'

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    
    inputComponent,
    iconComponent,
    tagComponent,
    tagEditComponent,
    comComponent,

    numberDirective,
    moneyDirective,
    thousandsDirective,
    
    navComponent,
    removeComponent,
    mediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
