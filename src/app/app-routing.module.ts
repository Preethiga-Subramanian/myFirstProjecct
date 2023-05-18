import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { RoleRegisterComponent } from './role-register/role-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  {path: "home",component: HomeComponent},
  {path: "user-login",component: UserLoginComponent},
  {path: "user-register",component: UserRegisterComponent},
  {path: "role-register/:page",component: RoleRegisterComponent},
  {path: "user-list/:id/:role",component: UserListComponent},
  {path: "edit-user/:id/:role",component: EditUserComponent},
  {path: "role-list",component: RoleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
