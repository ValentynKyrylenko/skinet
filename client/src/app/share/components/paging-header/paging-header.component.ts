import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {
  //add the input that we get from angular core
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;


  constructor() { }

  ngOnInit(): void {
  }

}
