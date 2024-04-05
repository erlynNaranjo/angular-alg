import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './modules/customer/components/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './modules/admin/components/admin-page/admin-page.component';
import { LoginComponent } from './auth/component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AdminPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
