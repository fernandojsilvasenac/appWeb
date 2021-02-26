import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Symptoms } from './interface/symptoms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  private symptomsCollection: AngularFirestoreCollection<Symptoms>;

  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage){
      this.symptomsCollection = this.afs.collection<Symptoms>('symptoms');
  }

   getAll(){ // buscar todos
      // return this.afs.collection('symptoms', ref => ref.orderBy('name','asc'))
      return this.afs.collection('symptoms')
        .snapshotChanges().pipe(
          map( changes => {
            return changes.map( s => {
              const id = s.payload.doc.id;
              const data = s.payload.doc.data() as Symptoms
              return { id, ...data };
            })
          })
        )
   }

   getById(id: string){ // buscar por Id

   }

   addSymptoms(){

   }

   updateSymptoms(){

   }

   deleteSymptoms(){

   }


}
