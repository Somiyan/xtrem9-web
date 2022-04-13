import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/button';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AppMainComponent } from './app-main/app-main.component';import { SidebarComponent } from './components/sidebar/sidebar.component';
;

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    AppMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
