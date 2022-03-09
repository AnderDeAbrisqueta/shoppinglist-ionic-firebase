import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  item: Item = { itemId: '', name: '', quantity: 1, imageUrl: '' };
  pageTitle: string = 'Nuevo elemento';
  action: string = 'create';

  constructor(
    private itemService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      // edit mode
      this.pageTitle = 'Editar elemento';
      this.action = 'edit';
      this.itemService.getItem(id).subscribe((data) => (this.item = data));
    }
  }

  addItem() {
    if (this.action === 'create') {
      this.itemService.addItem(this.item);
    } else {
      this.itemService.updateItem(this.item);
    }
    this.router.navigateByUrl('/list');
  }
}
