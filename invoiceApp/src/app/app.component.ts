import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

class itemObject {
  itemNo :any;
  unitPrice !:number;
  quantity !:number;
  tax !:number
 
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'invoiceApp';

  userForm!: FormGroup;
  invoiceBody!: FormGroup;
  displayCart!:boolean;
  addedArray:any=[];
  itemName!:any;
  price !: number;
  Qty!:number;
  tax!:number;
  amount!:number;
  Received =0;
  formSubmitted !:boolean;
  

  itemObject=new itemObject()
  itemsArray :Array<itemObject> =[];
  


constructor(private fb: FormBuilder){

}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name : ['',Validators.required],
      address : ['',Validators.required],
      date: ['',Validators.required],
      checked : ['']
    });
    this.displayCart = false; 
    this.formSubmitted = false;

  }

 

  addRow() {
    console.log(this.userForm)
    this.displayCart = true; 
    this.itemsArray.push(new itemObject())


  }

  removeRow(i: number) {
    this.itemsArray.splice(i)
  }

  getItemTotal(item: itemObject) {
    if(!item.quantity || !item.tax){
      item.tax =0
    }
    return (item.quantity && item.unitPrice) ? (item.quantity * item.unitPrice + item.tax) : 0;
  }

  getInvoiceTotal() {
    return this.itemsArray.reduce((acc, item) => {
      acc += this.getItemTotal(item);
      return acc;
    }, 0)
  }

  overAlltax(){
    return this.itemsArray.reduce((acc, item) => {
      acc += item.tax;
      return acc;
    }, 0)
  }

  submitForm(){
    this.formSubmitted = true;
  }
}
