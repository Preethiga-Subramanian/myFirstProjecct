import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { PasswordvalidationService } from '../passwordvalidation.service';
import { UserslistService } from '../userslist.service'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  formdata : any;
  finalage : string = "0";
  constructor(private users:UserslistService,private customValidator:PasswordvalidationService,private router:Router,private notifyService:NotificationService){}
  ngOnInit(){
    this.formdata = new FormGroup({
      firstname : new FormControl("",Validators.compose([Validators.required])),
      lastname : new FormControl("",Validators.compose([Validators.required])),
      gender : new FormControl("",Validators.compose([Validators.required])),
      dob : new FormControl("",Validators.compose([Validators.required])),
      age : new FormControl(""),
      emailid : new FormControl("",Validators.compose([Validators.required,Validators.email])),
      pwd : new FormControl("",Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(12),this.customValidator.patternValidator()]))    });
  }
  onClickSubmit(data : any){
    data.age = this.finalage;
    this.users.getRoleIdByRolename("user").subscribe({next:(result)=>{
      data.roleid = result[0].id;
      data.role = result[0].role;
      this.users.saveUserData(data).subscribe(() => {
        this.notifyService.showSuccess("Registration successful !!");
        this.router.navigate(['/user-login']);
      });
    },
    error:(e) => {
      console.log(e);
      this.notifyService.showError("Server Down!!");
    }
    });
  }
  calculateAge(event : Event):void{
    this.finalage = this.users.calculateAge(event);
  }
  backFunction(){
    this.router.navigate(['/home']);
  }
}
