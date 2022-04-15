import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IThinkIconModule } from '@ithinkicon/ithinkicon';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IThinkIconModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
