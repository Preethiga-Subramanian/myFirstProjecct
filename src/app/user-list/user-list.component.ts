import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { UserslistService } from '../userslist.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usersData : any = "";
  isAdminVar : boolean = false;
  constructor(private users:UserslistService,private router:Router , private route:ActivatedRoute,private notifyService:NotificationService){
  }
  ngOnInit(){
    this.isAdminVar = this.users.isAdmin;
    this.usersDetails();
  }
  usersDetails(){
    this.usersData = this.users.sharedData;
    if(this.isAdminVar){
      this.users.getAllUsersList().subscribe({next:(result) =>{
        this.usersData = result;
      },
      error:(e) => {
        console.log(e);
        this.notifyService.showError("Server Down!!");
      }
      });
    }
    else{
      this.users.getUserDetailsById(this.route.snapshot.params['id']).subscribe({next:(result) => {
        this.usersData = result;
      },
      error:(e) => {
        console.log(e);
        this.notifyService.showError("Server Down!!");
      }
      });
    }
  }
  logoutFunction(){
    this.router.navigate(['/user-login']);
  }
  userDeleteFunction(id:number){
    this.users.deleteUserData(id).subscribe({next:() => {
      this.notifyService.showWarning("User Deleted !!");
      let rolectrl = this.route.snapshot.params['role'];
      this.router.navigate(['/user-list/'+id+'/'+rolectrl]);
    },
    error:(e) => {
      console.log(e);
      this.notifyService.showError("Server Down!!");
    }
    });

  }

}
