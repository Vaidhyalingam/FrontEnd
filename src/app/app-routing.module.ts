import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { ReadComponent } from './read/read.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'create/:id', component: CreateComponent },
  { path: 'read', component: ReadComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
