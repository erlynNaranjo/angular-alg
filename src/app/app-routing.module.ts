import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/customer/components/main-page/main-page.component';
import { AdminPageComponent } from './modules/admin/components/admin-page/admin-page.component';
import { LoginComponent } from './auth/component/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  {path:"customer", component: MainPageComponent},
  {path:"admin", component: AdminPageComponent,canActivate: [AuthGuard]},
  {path:"login", component: LoginComponent },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: "", component:MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
