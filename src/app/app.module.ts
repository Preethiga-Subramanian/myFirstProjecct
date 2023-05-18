import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { RoleRegisterComponent } from './role-register/role-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserslistService } from './userslist.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RoleListComponent } from './role-list/role-list.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './notification.service';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ChildComponent } from './child/child.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
    UserRegisterComponent,
    RoleRegisterComponent,
    UserListComponent,
    EditUserComponent,
    RoleListComponent,
    ChildComponent,
    TodoListComponent,
    TodoAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-center",
      timeOut: 5000, // 5 seconds
      closeButton: true,
      progressBar: true
    }),
    BrowserAnimationsModule
  ],
  providers: [ UserslistService,NotificationService,
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: HttpErrorInterceptor,
                  multi: true
                }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
