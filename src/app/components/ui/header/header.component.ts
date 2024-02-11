import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private UiService: UiService,private router: Router) {}

  toggleSidebar(): void {
    this.UiService.toggleSidebar();
  }
  onLogout(){
    this.router.navigate(['/login']);
  }
  onHome(){
    this.router.navigate(['/main']);
  }
}
