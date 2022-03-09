import { Injectable } from '@angular/core';
import {
  collectionData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  pathToItems = `users/${this.auth.getCurrentUser().uid}/items`;

  constructor(private firestore: Firestore, private auth: AuthService) {}

  public async addItem(item: Item) {
    await addDoc(collection(this.firestore, this.pathToItems), item);
  }

  getItems(): Observable<Item[]> {
    const collectionRef = collection(this.firestore, this.pathToItems);
    return collectionData(collectionRef, { idField: 'itemId' }) as Observable<
      Item[]
    >;
  }

  async deleteItem(id: string) {
    await deleteDoc(doc(this.firestore, `${this.pathToItems}/${id}`));
  }

  async updateItem(item: Item) {
    await setDoc(doc(this.firestore, `${this.pathToItems}/${item.itemId}`), item);
  }

  getItem(id: string): Observable<Item> {
    const docRef = doc(this.firestore, `${this.pathToItems}/${id}`);
    return docData(docRef, { idField: 'itemId' }) as Observable<Item>;
  }
}
