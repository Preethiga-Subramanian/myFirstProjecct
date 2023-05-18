import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { UserslistService } from '../userslist.service';

@Component({
  selector: 'app-role-register',
  templateUrl: './role-register.component.html',
  styleUrls: ['./role-register.component.scss']
})
export class RoleRegisterComponent {
  roleRegisterform:FormGroup = new FormGroup({});
  page : number = 0;
  constructor(private users:UserslistService, private router:Router, private route:ActivatedRoute,private notifyService:NotificationService){}
  ngOnInit(){
    this.roleRegisterform = new FormGroup({
      role : new FormControl("",Validators.compose([Validators.required])),
    });
    this.page = this.route.snapshot.params['page'];
  }
  roleRegisterFunction(data : FormData){
    this.users.saveRoleData(data).subscribe({next:() => {
      this.notifyService.showSuccess("New role created!!");
      this.router.navigate(['/role-list']);
    },
    error:(e) => {
      console.log(e);
      this.notifyService.showError("Server Down!!");
    }
    });

  }
  backFunction(){
    if(this.page == 0)
      this.router.navigate(['/user-list/0/admin']);
    else
      this.router.navigate(['/role-list']);
  }
}
