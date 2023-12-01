import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface Menu {
  name: string;
  icon: string;
  link: string;
}
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menuList: Menu[] = [
    {
      name: 'Read',
      icon: 'folder',
      link: '/read',
    },
  ];
}
