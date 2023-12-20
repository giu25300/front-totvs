import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})

export class ClienteComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Cliente');
    this.router.navigate(['/clientes/novo']);
  }
}
