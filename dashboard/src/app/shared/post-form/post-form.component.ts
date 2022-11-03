import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() messageCtrl: any;

  constructor() { }

  ngOnInit(): void {
  }

}
