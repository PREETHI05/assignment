import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  async addinfo(record) {
    let result = await this.db.list('/details').push(record);
    //this.shoppingCartService.clearCart();
    return result;
  }
}
