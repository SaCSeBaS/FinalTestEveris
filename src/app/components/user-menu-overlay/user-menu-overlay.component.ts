import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-menu-overlay',
  templateUrl: './user-menu-overlay.component.html',
  styleUrls: ['./user-menu-overlay.component.sass'],
})
export class UserMenuOverlayComponent implements OnInit {

  @Input() user: User;
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) {
  
  }

  ngOnInit(): void {
   
  }

  signOut() {
    this.toast.info('Esperamos que vuelvas pronto', 'Cerraste sesión');
    this.authService.signOut();
    this.logout.emit();
    this.router.navigateByUrl('');
  }

}
