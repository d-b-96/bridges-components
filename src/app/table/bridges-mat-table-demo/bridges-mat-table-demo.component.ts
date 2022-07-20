import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { catchError, of, tap, Subject, take } from 'rxjs';
import {
  BridgesTableColumnDefinitionElement,
  BridgesTableData,
  SortOrPageChange,
} from '../bridges-mat-table/bridges-mat-table.component';
import { GithubIssue, GithubService } from './github.service';

@Component({
  selector: 'bridges-mat-table-demo',
  templateUrl: './bridges-mat-table-demo.component.html',
  styleUrls: ['./bridges-mat-table-demo.component.css'],
})
export class BridgesMatTableDemoComponent implements OnInit {
  $data: Subject<BridgesTableData<GithubIssue[]>> = new Subject<
    BridgesTableData<GithubIssue[]>
  >();

  sortOrPageChange: SortOrPageChange = {
    sortActive: '',
    sortDirection: '',
    pageIndex: 0,
    pageSize: 10,
  };

  columnDefinition: BridgesTableColumnDefinitionElement[] = [
    {
      identifier: 'created_at',
      title: 'Created',
      sortable: true,
      sticky: true,
    },
    { identifier: 'state', title: 'State' },
    { identifier: 'number', title: 'Number' },
    { identifier: 'title', title: 'Title' },
  ];

  selectVisible: boolean = true;
  selectSticky: boolean = true;

  displayedIdentifiers!: string[];
  displayedTitles!: string[];

  isRateLimitReached = false;

  selection = new SelectionModel<GithubIssue>(true, []);

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.fetch();
  }

  sortOrPageChanged(sortObject: SortOrPageChange) {
    console.log(sortObject);
    sortObject.sortActive =
      sortObject.sortActive == 'created_at' ? 'created' : '';
    this.sortOrPageChange = sortObject;
    this.fetch();
  }

  fetch() {
    this.githubService
      .getRepoIssues(
        this.sortOrPageChange.sortActive,
        this.sortOrPageChange.sortDirection,
        this.sortOrPageChange.pageIndex,
        this.sortOrPageChange.pageSize
      )
      .pipe(
        catchError(() => of(null)),
        tap((data) => {
          // Flip flag to show that loading has finished.
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.$data.next({
            totalCount: data.total_count,
            data: data.items,
          });

          return;
        })
      )
      .subscribe();
  }
}
