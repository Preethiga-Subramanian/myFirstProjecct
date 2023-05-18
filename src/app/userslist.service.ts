import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concatMap, filter, forkJoin, map, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class UserslistService {
  public response : any;
  sharedData : any;
  isAdmin : boolean = false;
  url : string = 'http://localhost:3000/users';
  roleurl : string = 'http://localhost:3000/roles';
  constructor(private http:HttpClient,private notifyService:NotificationService) {  }

  getAllUsersList():Observable<any>{
    return this.http.get(this.url);
  }
  getSingleUserData(email: string):Observable<any>{
    //let response:any;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("emailid",email);
    // try{
    //   response  = this.http.get(this.url,{params:queryParams});
    // }catch(error){
    //   console.log(error);
    // }
    // console.log(response);
    return this.http.get(this.url,{params:queryParams});
  }
  saveUserData(singleUserData : object):Observable<any>{
    return this.http.post(this.url,singleUserData);
  }
  deleteUserData(id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  getUserDetailsById(id:number):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",id);
    return this.http.get(this.url,{params:queryParams});
  }
  updateUserData(id:number,data:object):Observable<any>{
    return this.http.put(`${this.url}/${id}`,data);
  }
  saveRoleData(roleData : object):Observable<any>{
    return this.http.post(this.roleurl,roleData);
  }
  deleteRoleData(id:number):Observable<any>{
    return this.http.delete(`${this.roleurl}/${id}`);
  }
  getAllRolesList():Observable<any>{
    return this.http.get(this.roleurl);
  }
  calculateAge(event : Event):string{
    let today = new Date();
    let birthdate:Date = new Date();
    let finalage :string = "";
    if(event.target != null){
      birthdate = new Date((event.target as HTMLInputElement).value);
      let age:number = today.getFullYear() - birthdate.getFullYear();
      const mon = today.getMonth() - birthdate.getMonth();
      if(mon<0 || (mon===0 && today.getDate() < birthdate.getDate())){
        age--;
      }
      finalage = age.toString();
    }
    return finalage;
  }
  getRoleIdByRolename(rolename:string):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("role",rolename);
    return this.http.get(this.roleurl,{params:queryParams})
  }
  forkJoinFunction():Observable<any>{
    return forkJoin([
      this.http.get(this.url),
      this.http.get(this.roleurl)
    ])
  }
  switchMapFunction():Observable<any>{
    let response :any;
    return this.http.get(this.roleurl)
    .pipe(
      switchMap((roles:any):any => {
        roles.forEach((element: any) => {
          console.log(element);
          if(element.role == "admin"){
            let queryParams = new HttpParams();
            queryParams = queryParams.append("roleid",element.id);
            response = this.http.get(this.url,{params:queryParams});
          }
        });
        return response;
      })
    )
  }
  mapFunction():Observable<any>{
    return this.http.get(this.url)
    .pipe(
      tap((val:any) => {
        console.log("Before Map");
        val.forEach((element:any) => {
          console.log(element);
        })
      }),
      map((data:any) => {
          data.forEach((element:any) => {
            element.fullname = element.firstname+' '+element.lastname;
          });
          return data;
      }),
      tap((val:any) => {
        console.log("After Map");
        val.forEach((element:any) => {
          console.log(element);
        })
      }),
    )
  }
concatMapFunction():Observable<any>{
  let res:any;
  return this.http.get(this.roleurl)
  .pipe(
    concatMap((val:any) => {
        val.forEach((element: any) => {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("gender","male");
        queryParams = queryParams.append("roleid",element.id);
        res =  this.http.get(this.url,{params:queryParams});
      });
      console.log("MergeMap");
      return res;
    })
  );
}
}

