import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

//import firestore from 'firebase/firestore';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
 items : any;
  formdata: FormGroup;
  emp: any;
  EmployeeId: string;
  constructor(private router: Router,
      private route: ActivatedRoute, 
    private _firebaseServ: FirebaseService) { 
    
   }
 ngOnInit() {
  this.EmployeeId = this.route.snapshot.queryParamMap.get('id');
  //console.log(this.EmployeeId);
  if(this.EmployeeId) {
   const employeeKeyValues = {}; 
     this._firebaseServ.employeeDetails(this.EmployeeId).snapshotChanges().subscribe(actions => {

      actions.forEach(action => {
        const value = action.payload.val();
        const id = action.payload.key;
        employeeKeyValues[id] = value;
        //console.log(employeeKeyValues);
        
      });
      this.editEmployee(employeeKeyValues);
    });
  }
   
   this.formdata = new FormGroup({
     Firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
     Lastname: new FormControl(''),
     Email: new FormControl('', [Validators.required, Validators.email]),
     Dateofbirth: new FormControl(''),
     Gender: new FormControl(''),
     Designation: new FormControl(''),
     Phonenumber: new FormControl('',  [
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });
 }

   editEmployee(emp : any) {
     //console.log(emp.Firstname);
      this.formdata.patchValue({
        Firstname: emp.Firstname,
        Lastname: emp.Lastname,
        Email: emp.Email,
        Dateofbirth: emp.Dateofbirth,
        Gender: emp.Gender,
        Designation: emp.Designation,
        Phonenumber: emp.Phonenumber

      });
   }
 onsubmit() {
 if(this.EmployeeId) {
   this._firebaseServ.updateUser(this.EmployeeId, this.formdata.value).then(
    res => {
      this.router.navigate(['/employees-list']);
    });
  } else {
    this._firebaseServ.addinfo(this.formdata.value).then(resp => {
      console.log(resp);
      this.router.navigate(['/employees-list']);
      });
     }
  }

  resetForm() {
    this.formdata.reset();
  }

  cancelForm() {
    this.router.navigate(['/employees-list']);
  }
  
}
