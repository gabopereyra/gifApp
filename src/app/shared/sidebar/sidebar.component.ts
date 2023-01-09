import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  get historial(){
    return this.gifsService.historial;
  }

  buscar(query : string){
    this.gifsService.buscarGifs(query);
  }

  constructor(
    private gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

}
