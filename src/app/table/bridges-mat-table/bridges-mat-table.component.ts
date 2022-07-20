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
  allSelected: boolean = false;

  included: any[] = [];
  excluded: any[] = [];

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
      // Remove spinner
      this.isLoadingResults = false;

      // Set data
      this.dataSource.data = data.data;

      // Select correct rows w/ pagination
      this.dataSource.data.forEach((row) => {
        if (
          (this.allSelected && !this.excluded.some((x) => x.id == row.id)) ||
          (!this.allSelected && this.included.some((x) => x.id == row.id))
        ) {
          this.selection.select(row);
        }
      });

      // Set totalcount if available
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

  removeFromArray(list: any[], obj: any) {
    list.forEach((item, index) => {
      if (item.id == obj.id) {
        list.splice(index, 1);
      }
    });
  }

  getDisplayedIdentifiers() {
    if (this.selectVisible)
      return [...'select', this.columnDefinition.map((x) => x.identifier)];
    else return this.columnDefinition.map((x) => x.identifier);
  }

  rowSelected(row: any) {
    this.selection.toggle(row);

    if (this.allSelected) {
      if (this.isSelected(row)) {
        // remove from excluded
        if (this.excluded.some((x) => x.id == row.id)) {
          this.removeFromArray(this.excluded, row);
        }
      } else {
        // if in excluded => nothing
        // if not in excluded => add to excluded
        if (!this.excluded.some((x) => x.id === row.id)) {
          this.excluded.push(row);
        }
      }
    } else {
      // add to included or remove from included
      if (this.isSelected(row)) {
        // if in included => nothing
        // if not in included => add to included
        if (!this.included.some((x) => x.id === row.id)) {
          this.included.push(row);
        }
      } else {
        // remove this from included
        if (this.included.some((x) => x.id == row.id)) {
          this.removeFromArray(this.included, row);
        }
      }
    }

    this.selection.selected.push(row);
  }

  isSelected(row: any): boolean {
    return this.selection.isSelected(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    return this.allSelected;
  }

  isIndeterminate() {
    return (
      (this.allSelected && this.excluded.length > 0) ||
      (!this.allSelected && this.included.length > 0)
    );
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.excluded = [];
    this.included = [];
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selection.select(...this.dataSource.data);
    } else {
      this.selection.clear();
    }
  }
}
