import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router : Router){ }

  onSignup(){
  
  let users = JSON.parse(localStorage.getItem('users') || '[]');

  const userExists = users.some((user:any) => user.email == this.email);

  if(userExists){
    this.error = 'Email already exists!';
    return
  }

  const newUser= {username: this.username, email :this.email, password: this.password};
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  this.router.navigate(['/login']);
}
}
