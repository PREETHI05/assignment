import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
//import { NgModule } from '@angular/core';
import * as firebase from 'firebase';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  items: any;
  idexes = [];
  id: string;
  filteredEmployees : any;
  private _searchTerm : string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.items.filter(res => res.Firstname.toLowerCase().indexOf( this._searchTerm .toLowerCase()) !== -1);
    
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _firebaseServ: FirebaseService) { 
     }

  ngOnInit() {
    this._firebaseServ.getInfo().snapshotChanges().subscribe(result => {
      if(result) {
      this._firebaseServ.getInfo().valueChanges().subscribe(res => {
        this.items = res;
        for (let i= 0; i< this.items.length; i++) {
          this.items[i]["Id"] = result[i] ? result[i].key : "";    
        }
       this.filteredEmployees = this.items;
   
      })
    } 
    })
  }
  
  updateInfo(employeeId : string) {
    
        this.router.navigate(['/employee-add'], { queryParams: {employeeId}});
  }

  deleteData(employeeID : string) {
    this._firebaseServ.deleteUser(employeeID)
    .then(
      res => {
        this.router.navigate(['/employees-list']);
      });
  }

}
