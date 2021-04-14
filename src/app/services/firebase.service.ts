import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
//import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})


export class FirebaseService {
  details: any[];
  employeeList: AngularFireList<any>;
  //firebase: any;
  constructor(private db : AngularFireDatabase ) { }

  async addinfo(record) {
    let result = await this.db.list('/details').push(record);
    return result;
  }

  async getInfo() {
    
    return new Promise<any>((resolve, reject) => { this.db.list('/details').valueChanges().subscribe(det => {
      resolve(det)
     // this.details = det;
     // console.log(det);
    })
  })
    //return x;
    /*let x = this.db.list('/details').valueChanges();
    x.subscribe(det => {
      this.details = det;
      console.log(this.details);
    })
    console.log(x);*/
  }
  }
  


