import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserslistService } from '../userslist.service';
import { ActivatedRoute,Router } from '@angular/router'
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  editUserformdata :any =  new FormGroup({
    firstname : new FormControl(""),
    lastname : new FormControl(""),
    gender : new FormControl(""),
    dob : new FormControl(""),
    age : new FormControl(""),
    emailid : new FormControl(""),
    role : new FormControl(""),
    pwd : new FormControl(""),
  });
  finalage : string = "";
  isAdmin : boolean = false;
  pwd : string = "";
  id : number = 0;
  rolectrl : string = "";
  roles:Array<{id:number,role:string}> = [];
  currentRole:string = "";
  constructor(private users:UserslistService,private router:ActivatedRoute,private route:Router,private notifyService:NotificationService){}
  ngOnInit(){
    this.users.getUserDetailsById(this.router.snapshot.params['id']).subscribe((result) => {
      this.editUserformdata = new FormGroup({
        firstname : new FormControl(result[0].firstname,Validators.compose([Validators.required])),
        lastname : new FormControl(result[0].lastname,Validators.compose([Validators.required])),
        gender : new FormControl(result[0].gender),
        dob : new FormControl(result[0].dob),
        age : new FormControl(result[0].age),
        emailid : new FormControl(result[0].emailid,Validators.compose([Validators.required,Validators.email])),
        role : new FormControl(result[0].role,Validators.compose([Validators.required])),
        pwd : new FormControl(result[0].pwd),
      });
      this.finalage = result[0].age;
      this.isAdmin = this.users.isAdmin;
      this.pwd = result[0].pwd;
      console.log(result[0]);
      this.rolectrl = this.router.snapshot.params['role'];
      this.id = this.router.snapshot.params['id'];
      this.users.getAllRolesList().subscribe((res) =>{
        this.roles = res;
      });
    });

  }
  onClickSubmit(data : any){
    console.log(data);
    data.age = this.finalage;
    data.pwd = this.pwd;
    this.users.getRoleIdByRolename(data.role  ).subscribe({next:(res) => {
      data.roleid = res[0].id;
      console.log(data);
      this.users.updateUserData(this.router.snapshot.params['id'],data).subscribe({
        next:() => {
          this.notifyService.showSuccess("Data Updated !!");
          this.route.navigate(['/user-list/'+this.id+'/'+this.rolectrl]);
      },
      error:((e) => {
        console.log(e);
        this.notifyService.showError("Server Down!!");
      })
    });
    },
    error:(e) =>{
      console.log(e);
      this.notifyService.showError("Server Down!!");
    }
    });
  }
  backFunction(){
    this.route.navigate(['/user-list/'+this.id+'/'+this.rolectrl]);
  }
  calculateAge(event : Event):void{
    this.finalage = this.users.calculateAge(event);
  }
}
