import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface student {
  id : number;
  name : string;
  age : number;
  course: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  records: student[] = [];
editRecord: student = { id: 0, name: '', age: 0, course: '' };

  constructor(private router : Router){}

  ngOnInit(): void{
    this.loadRecords();
    this.checkLogin();
  }

  checkLogin() {  
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser){
      this.router.navigate(['/login']);
    }
  }

  loadRecords(){
    const data = localStorage.getItem('records');
    if(data){
      this.records = JSON.parse(data);
    }else{
      this.records = [
        { id: 1, name: 'chandu', age: 22, course: 'Angular' },
        { id: 2, name: 'sameer', age: 21, course: 'React' },
      ];
      localStorage.setItem('records', JSON.stringify(this.records));
    }
  }
  saveRecords(){
    localStorage.setItem('records',JSON.stringify(this.records));
  }

  addRecord(newRecord: student){
    newRecord.id = this.records.length? this.records[this.records.length - 1].id+1 : 1;

    this.records.push(newRecord);
    this.saveRecords();
  }

  updateRecord(updated: student){
    const index = this.records.findIndex((r) => r.id === updated.id);

    if(index !== -1){
      this.records[index] = updated;
      this.saveRecords();
    }
  }

  deleteRecord(id: number){
    this.records = this.records.filter((r) => r.id !== id);
    this.saveRecords();
  }

  edit(id: number){
    const record = this.records.find((r)=> r.id === id);
    if(record){
      this.editRecord = { ...record};
    }
  }
  resetForm() {
  this.editRecord = { id: 0, name: '', age: 0, course: '' };
}


  logout(){
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
