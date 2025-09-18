import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc,
  updateDoc,
  deleteDoc,
  doc

 } from '@angular/fire/firestore';

 import { Observable } from 'rxjs';

 export interface Student{
  id?: string;
  name: string;
  age:number;
  course: string;

 }

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private studentCollection;

  constructor(private firestore: Firestore) {
    this.studentCollection = collection(this.firestore, 'students');
   }

   getStudents(): Observable<Student[]>{
    return collectionData(this.studentCollection, { idField: 'id'})as Observable<Student[]>;
  }

  addStudent(student: Student){
    return addDoc(this.studentCollection, student);
}

 updateStudent(student: Student) {
    const studentDoc = doc(this.firestore, `students/${student.id}`);
    return updateDoc(studentDoc, { ...student });
  }

  deleteStudent(id: string) {
    const studentDoc = doc(this.firestore, `students/${id}`);
    return deleteDoc(studentDoc);
  }
}
