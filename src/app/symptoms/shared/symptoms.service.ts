import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Symptoms } from './symptoms';
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
      return this.symptomsCollection.doc<Symptoms>(id).valueChanges();
   }

   addSymptoms(symptoms: Symptoms){
      // 1 momento
      this.afs.collection('symptoms').doc().set(Object.assign({}, symptoms))

      // return this.symptomsCollection.add(symptoms);

      // 2 momento
      // criar id
      // const id = this.afs.createId();
      // const { name, description } = symptoms;

      // this.afs.collection('symptoms').doc(id).set(
      //   {
      //     name: name,
      //     description: description,
      //   }
      // )

   }

   updateSymptoms(symptoms: Symptoms, id: string){
      this.symptomsCollection.doc<Symptoms>(id).update(Object.assign({}, symptoms));
   }

   deleteSymptoms(id: string){
      this.symptomsCollection.doc<Symptoms>(id).delete();
   }


}
