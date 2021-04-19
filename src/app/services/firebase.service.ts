import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
//import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})


export class FirebaseService {
  details: any[];
  constructor(private db : AngularFireDatabase ) { 
   
  }

  async addinfo(record) {
    
    let result = await this.db.list('/details').push(record);
    return result;
   
  }

   getInfo() {
      return this.db.list('/details');
  }

  employeeDetails(id: string) {
// console.log(this.db.list(`/details/${id}`));
     return this.db.list(`/details/${id}`);
  }

  updateUser(userKey, value) {
   return this.db.list('/details').update(userKey, value);
 }
  
 deleteUser(userKey) {
   if (confirm('Delete employee?')) {
     return this.db.list('/details').remove(userKey);
   }
}
   
}










  