import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth.service.service';
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

  constructor(private router : Router, private authService :AuthServiceService){ }

  async onSignup(){
    try{
      await this.authService.signup(this.email, this.password);
      this.router.navigate(['/login']);
    }catch(err:any){
    
      console.error("Signup error:", err);
    this.error = err.message;
    }
  }
}
