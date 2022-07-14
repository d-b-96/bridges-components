import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { GithubIssue } from '../bridges-mat-table-demo/github.service';

export class BridgesTableData<T> {
  totalCount?: number;
  data!: T;
}

export interface BridgesTableColumnDefinitionElement {
  identifier: string;
  sortable?: boolean;
  title: string;
  sticky?: boolean;
}

export interface SortOrPageChange {
  sortActive: string;
  sortDirection: string;
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'bridges-mat-table',
  templateUrl: './bridges-mat-table.component.html',
  styleUrls: ['./bridges-mat-table.component.css'],
})
export class BridgesMatTableComponent implements OnInit, AfterViewInit {
  @Input() columnDefinition!: BridgesTableColumnDefinitionElement[];
  @Input() $data: Observable<BridgesTableData<GithubIssue[]>> =
    new Observable();
  @Input() pageSizeOptions: number[] = [10, 25, 50];
  @Input() selectVisible: boolean = false;
  @Input() selectSticky: boolean = false;

  @Output() sortOrPageChange: EventEmitter<SortOrPageChange> =
    new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedIdentifiers!: string[];
  displayedTitles!: string[];
  isRateLimitReached = false;
  isLoadingResults = true;

  dataSource = new MatTableDataSource<GithubIssue>();
  selection = new SelectionModel<GithubIssue>(true, []);

  totalCount = 0;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.selectVisible)
      this.columnDefinition.unshift({
        identifier: 'select',
        title: '',
        sticky: this.selectSticky,
      });

    this.$data.subscribe((data) => {
      this.isLoadingResults = false;
      this.dataSource.data = data.data;

      if (data.totalCount) this.totalCount = data.totalCount;
    });

    this.displayedIdentifiers = this.columnDefinition.map((x) => x.identifier);
    this.displayedTitles = this.columnDefinition.map((x) => x.title);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.isLoadingResults = true;
      this.sortOrPageChange.emit({
        sortActive: this.sort.active,
        sortDirection: this.sort.direction,
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
      });
    });
  }

  getDisplayedIdentifiers() {
    if (this.selectVisible)
      return [...'select', this.columnDefinition.map((x) => x.identifier)];
    else return this.columnDefinition.map((x) => x.identifier);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}
