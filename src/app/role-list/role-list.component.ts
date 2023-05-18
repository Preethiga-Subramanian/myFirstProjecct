import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { UserslistService } from '../userslist.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
  roles : Array<{id:number,role:string}> = [];
  constructor(private users:UserslistService,private router:Router,private notifyService:NotificationService){}

  ngOnInit(){
    this.roleDetails();
  }
  roleDeleteFunction(id:number){
    this.users.deleteRoleData(id).subscribe({next:() => {
      this.notifyService.showWarning("Role Successfully Deleted !!");
      this.router.navigate(['/role-list']);
    },
    error:(e) => {
      console.log(e);
      this.notifyService.showError("Server Down!!");
    }
    });

  }
  roleDetails(){
      this.users.getAllRolesList().subscribe({next:(result) => {
        this.roles = result;
      },
      error:(e) => {
        console.log(e);
        this.notifyService.showError("Server Down!!");
      }
      });
  }
  backFunction(){
    this.router.navigate(['/user-list/0/admin']);
  }
}
