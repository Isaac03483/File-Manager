import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTree, MatTreeNestedDataSource} from "@angular/material/tree";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{


  ngOnInit(): void {
    const treeData =  [
      {
        name: 'Fruit',
        children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
      },
      {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
          },
          {
            name: 'Orange',
            children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
          },
        ],
      },
    ];
    this.dataSource.data = treeData;
  }

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor() {
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
}

