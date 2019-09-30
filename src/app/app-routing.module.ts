import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListFormsComponent } from './list-forms/list-forms.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { PreviewComponent } from './preview/preview.component';
import { PredictComponent } from './predict/predict.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'userprofile', component: UserprofileComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'formbuilder', component: FormBuilderComponent},
  // { path: 'forms-list', component: ListFormsComponent},
  // { path: 'preview/:id', component: PreviewComponent},
  // { path: 'predict', component: PredictComponent},
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'userprofile', component: UserprofileComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'formbuilder', component: FormBuilderComponent},
      { path: 'forms-list', component: ListFormsComponent},
      { path: 'preview/:id', component: PreviewComponent},
      { path: 'predict', component: PredictComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
