import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { User } from 'src/app/models/User';

import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: Boolean;
  User: User;
  categories$: Observable<Category[]>;

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  eventsSubject: Subject<void> = new Subject<void>();
  @Output() rfrCartPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() actualizarProductosCategoria: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService,
              private userService: UserService,
              private categoryService: CategoryService) { }

  checkAuth() {
    this.authService.getCurrentUser().subscribe(
      (value => {
        if(value)
        {
          this.userService.fsGetUser(value.uid).subscribe(
            ((result: User) => { 
              if(result && result.uid)
              {
                this.isAuth = true; 
                this.User = result;
              } 
              else 
              {
                this.isAuth = false;
                this.User = null;
              }
            })
          )
        }
      })
    )
  }

  updatePage() {
    this.rfrCartPage.emit();
  }

  logout(event) {
    this.User = null;
    this.isAuth = false;
  }

  ngOnInit(): void {
    this.checkAuth();
    this.categories$ = this.categoryService.fsGetCategories();
    this.eventsSubscription = this.events.subscribe(() => this.eventsSubject.next() );
  }

  cambiarProductos(uid) {
    this.actualizarProductosCategoria.emit(uid);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
