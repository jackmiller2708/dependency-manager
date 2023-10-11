import { TitlebarComponent } from '@components/molecules/titlebar/titlebar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TitlebarComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
