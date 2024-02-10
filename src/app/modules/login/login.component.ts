import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UiService } from 'src/app/services/ui/ui.service';
export class User {
  username: string;
  password: string;

  constructor(data: any = {}) {
    this.username = data.username;
    this.password = data.password;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User(); 
  loginError: string = '';

  constructor(private router: Router, private uiService:UiService) {}

  ngOnInit(): void {
  }

  onLogin(): void {
    // Hardcoded credentials for demonstration purposes
    this.uiService.show();
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password';
    // Check if username and password match the hardcoded credentials
 const matchedUser = this.user.username === hardcodedUsername && this.user.password === hardcodedPassword;
   
    try {
      if (matchedUser) {
        // Redirect to a different page (e.g., home page) upon successful login
        this.router.navigate(['/main']);
      } else {
        // Display an error message for invalid credentials
        this.loginError = 'Invalid username or password. Please try again.';
      } 
    } finally {
      this.uiService.hide()
    }
  }
  
  toRegister(): void{
    this.router.navigate(['/register']);
  }
}
