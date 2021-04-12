import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';
//import firestore from 'firebase/firestore';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  formdata: FormGroup;
 // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private _firebaseServ: FirebaseService) { }
 ngOnInit() {
   this.formdata = new FormGroup({
     Firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
     Lastname: new FormControl(''),
     Email: new FormControl('', [Validators.required, Validators.email]),
     Dateofbirth: new FormControl(''),
     Gender: new FormControl(''),
     Roles : new FormGroup({
     Designation: new FormControl('')
    }),
     Phonenumber: new FormControl('',  [
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])


  });
 }
 onsubmit() {

 }

 addinfo() {
   
   this._firebaseServ.addinfo(this.formdata.value).then(resp => {
     console.log(resp);
   });
 }
}
