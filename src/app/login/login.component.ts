import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth.service.service';
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
  constructor(private router : Router, private authService:AuthServiceService){
    this.email = '';
    this.password = '';
    this.error = '';
  }

  async onLogin() {
  try {
    await this.authService.login(this.email, this.password);
    this.router.navigate(['/dashboard']);
  } catch (err: any) {
    this.error = 'Invalid email or password';
    console.error(err);
  }
}

}
