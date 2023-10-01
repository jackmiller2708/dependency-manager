import { Component, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dependency-manager';

  ngOnInit(): void {
    invoke('greet', { name: 'Jack' }).then(console.log)
  }
}
