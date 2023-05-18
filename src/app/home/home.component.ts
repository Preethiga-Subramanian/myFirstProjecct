import { Component, Input, VERSION } from '@angular/core';
import { AsyncSubject, BehaviorSubject, of, ReplaySubject, Subject } from 'rxjs';
import { Customer } from '../customer';
import { UserslistService } from '../userslist.service';
// import { UserslistService } from '../userslist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // constructor(private users:UserslistService){}
  // ngOnInit(){
  //   console.log("Inside home");
  //   this.users.forkJoinFunction().subscribe((result) => console.log(result));
  //   this.users.switchMapFunction().subscribe((result) => console.log(result));
  //   this.users.mapFunction().subscribe((result) => console.log(result));
  //   this.users.concatMapFunction().subscribe((result) => console.log(result));
  // }
  // ngOnChanges(){
  //   console.log("Inside NgOnchanges");
  // }

sub = new AsyncSubject();
message = "Preethi";
content = "Priya";
displayChild = true;
name:string = "";
code:number = 0;
customer:Customer = new Customer();
  constructor() {
    console.log("HomeComponent:Contructed");
  }
  toggle() {
    this.displayChild = !this.displayChild;
  }
  updateCustomer(){
    this.customer.name = "preethiga";
    this.customer.code = 1;
  }
  ngOnChanges() {
    console.log("HomeComponent:ngOnChanges");
  }
  ngOnInit() {
    console.log("HomeComponent:ngOnInit");
    this.sub.next("a");
    this.sub.subscribe(
      val => console.log("sub1:"+val),
      err => console.error("Sub1 " + err),
      () => console.log("Sub1 Complete")
      );
    this.sub.next("1");
    this.sub.next("2");
    this.sub.next("3");
    this.sub.subscribe(val => console.log("sub2:"+val));
    this.sub.next("4");
    this.sub.complete();
    this.sub.error("err");
    this.sub.next("5");
    this.sub.subscribe(
      val => console.log("sub3:"+val),
      err => console.error("Sub3 " + err),
      () => console.log("Sub3 Complete")    );
    this.sub.next("6");
  }
  ngDoCheck() {
    console.log("HomeComponent:DoCheck");
    this.func();
  }
  ngAfterContentInit() {
    console.log("HomeComponent:ngAfterContentInit");
  }
  ngAfterContentChecked() {
    console.log("HomeComponent:AfterContentChecked");
  }
  ngAfterViewInit() {
    console.log("HomeComponent:AfterViewInit");
  }
  ngAfterViewChecked() {
    console.log("HomeComponent:AfterViewChecked");
  }
  ngOnDestroy() {
    console.log("HomeComponent:ngOnDestroy");
  }
  func(){
    let ele = [1,2,3,4,5];
    let obs = of(ele);
    obs.subscribe({
      next:(val: any) => console.log(val),
      error:(e: any) => console.log(e),
      complete:() => console.log("completed")
    })


  }

}
