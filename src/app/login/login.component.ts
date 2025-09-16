import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string;
  password: string;
  error: string;
  constructor(private router : Router){
    this.email = '';
    this.password = '';
    this.error = '';
  }

  onLogin(){
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((user: any)=> user.email== this.email && user.password == this.password);

    if(user){
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.router.navigate(['/dashboard']);
    }else{
      this.error = 'Invalid email or password!';
    }
  }
}
