import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PeriodicElement } from '../bridges-mat-table-demo/bridges-mat-table-demo.component';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  merge,
  Observable,
  switchMap,
  startWith,
  of,
} from 'rxjs';

export interface BridgesMatColumnDefinitionElement {
  identifier: string;
  title: string;
  sticky?: boolean;
}

@Component({
  selector: 'bridges-mat-table',
  templateUrl: './bridges-mat-table.component.html',
  styleUrls: ['./bridges-mat-table.component.css'],
})
export class BridgesMatTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // @Input() columnDefinition: BridgesMatColumnDefinitionElement[] = [
  //   { identifier: 'position', title: 'Position', sticky: true },
  //   { identifier: 'name', title: 'Name', sticky: true },
  //   { identifier: 'weight', title: 'Weight' },
  //   { identifier: 'symbol', title: 'Symbol' },
  // ];
  // @Input() data: PeriodicElement[] = [];
  // @Input() selectVisible: boolean = false;
  // @Input() selectSticky: boolean = false;

  exampleDatabase!: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];

  columnDefinition: BridgesMatColumnDefinitionElement[] = [
    { identifier: 'created_at', title: 'Created', sticky: true },
    { identifier: 'state', title: 'State', sticky: true },
    { identifier: 'number', title: 'Number' },
    { identifier: 'title', title: 'Title' },
  ];

  selectVisible: boolean = true;
  selectSticky: boolean = true;

  displayedIdentifiers!: string[];
  displayedTitles!: string[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  dataSource = new MatTableDataSource<GithubIssue>(this.data);
  selection = new SelectionModel<GithubIssue>(true, []);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.selectVisible)
      this.columnDefinition.unshift({
        identifier: 'select',
        title: '',
        sticky: this.selectSticky,
      });

    this.displayedIdentifiers = this.columnDefinition.map((x) => x.identifier);
    this.displayedTitles = this.columnDefinition.map((x) => x.title);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => of(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe((data) => (this.dataSource.data = data));
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

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log(sortState);
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(
    sort: string,
    order: SortDirection,
    page: number
  ): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
