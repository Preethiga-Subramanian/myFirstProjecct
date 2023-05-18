import { Component, Input, SimpleChange, SimpleChanges , KeyValueDiffers } from '@angular/core';
import { Customer } from '../customer';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @Input() message!:string;
  @Input() customer!: Customer;
  oldCustomer: Customer= new Customer();
  DocheckCount = 0;
  changelog: string[] = [];
  differ: any;
  constructor(private differs: KeyValueDiffers) {
    console.log("  ChildComponent:Contructed");
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log("  ChildComponent:ngOnChanges");
    console.log(JSON.stringify(changes));
    for(const prop in changes){
      const change = changes[prop];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${prop}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
    }
  }

  ngOnInit() {
    console.log("  ChildComponent:ngOnInit");
    this.oldCustomer = Object.assign({}, this.customer);
    this.differ = this.differs.find(this.customer).create();
  }

  ngDoCheck() {
    console.log("  ChildComponent:DoCheck");
    this.DocheckCount++;
    if(this.oldCustomer.name !== this.customer.name || this.oldCustomer.code !== this.customer.code){
      const to = JSON.stringify(this.customer);
      const from = JSON.stringify(this.oldCustomer);
      const changeLog = `DoCheck customer: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
      this.oldCustomer = Object.assign({}, this.customer);;
    }
    const customerChanges = this.differ.diff(this.customer);
    if (customerChanges) {
      console.log(customerChanges);
      this.changelog.push("Using Differ");
      customerChanges.forEachChangedItem((r:any) =>  this.changelog.push('changed ' + r.key + ' ' + JSON.stringify( r.currentValue)));
      customerChanges.forEachAddedItem((r:any) =>  this.changelog.push('added ' + r.key + ' ' + JSON.stringify( r.currentValue)));
      customerChanges.forEachRemovedItem((r:any) =>  this.changelog.push('removed ' + r.key + ' ' + JSON.stringify( r.currentValue)));
  }

  }

  ngAfterContentInit() {
    console.log("  ChildComponent:ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("  ChildComponent:AfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("  ChildComponent:AfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("  ChildComponent:AfterViewChecked");
  }

  ngOnDestroy() {
    console.log("  ChildComponent:ngOnDestroy");
  }
}
