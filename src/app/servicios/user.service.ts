import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user : any) {
    return this.firestore.collection('users').add(user);
  }

// En UserService
updateUser(user: any): Promise<void> {
    const userId = user.id;
    delete user.id;
    return this.firestore.doc('users/' + userId).update(user);
  }  

  deleteUser(user : any) {
    this.firestore.doc('users/' + user.id).delete();
  }
}
