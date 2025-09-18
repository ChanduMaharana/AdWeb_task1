import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../auth.service.service';
import { StudentServiceService , Student} from '../student.service.service';
import { Observable } from 'rxjs';

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
 students$! : Observable<Student[]>;

editRecord: Student = { id: '', name: '', age: 0, course: '' };

  constructor(
    private router: Router, 
    private authService: AuthServiceService,
    private studentService: StudentServiceService
  ) {}


  ngOnInit(): void{
    this.checkLogin();
    this.loadStudents();
  }

  checkLogin() {  
    if(!this.authService.getCurrentUser){
      this.router.navigate(['/login']);
    }
  }

  loadStudents(){
    this.students$ = this.studentService.getStudents();
  }

  addRecord(newRecord: Student){
    if(!newRecord.name || !newRecord.course)return;
    this.studentService.addStudent(newRecord);
  }

  updateRecord(student: Student) {
    if (student.id) {
      this.studentService.updateStudent(student);
      this.resetForm();
    }
  }

  deleteRecord(id: string | undefined){
    if(id){
      this.studentService.deleteStudent(id);
    }
  }

  edit(student: Student){
    this.editRecord = { ...student};
  }
  resetForm() {
  this.editRecord = { id: '', name: '', age: 0, course: '' };
}


  logout(){
    this.authService.logout();
  }
}
