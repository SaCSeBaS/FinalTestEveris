import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-menu-overlay',
  templateUrl: './categories-menu-overlay.component.html',
  styleUrls: ['./categories-menu-overlay.component.sass']
})
export class CategoriesMenuOverlayComponent implements OnInit {

  categories$: Observable<Category[]>;
  @Output() cambiarCategoria: EventEmitter<string> = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.fsGetCategories();
  }

  selectCategory(uid) {
    this.cambiarCategoria.emit(uid);
  }

}
