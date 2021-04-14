import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  items: Array<any>;
  
  constructor(private _firebaseServ: FirebaseService) { }

  ngOnInit() {
    //console.log('00');
    this._firebaseServ.getInfo().then(result => {
      this.items = result;
      //console.log('00');
      //console.log(this.items);
    })
   
  }



}
