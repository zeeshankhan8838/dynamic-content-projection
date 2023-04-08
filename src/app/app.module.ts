import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { AdhostDirective } from './adhost.directive';
import { ViewRefDirective } from './view-ref.directive';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    AdhostDirective,
    DynamicComponentComponent,
    ViewRefDirective,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
