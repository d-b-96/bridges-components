import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

export type BridgesMatTabNavData = {
  header: string;
  route: string;
  disabled?: boolean;
};

@Component({
  selector: 'bridges-mat-tab-nav-panel',
  templateUrl: './bridges-mat-tab-nav-panel.component.html',
  styleUrls: ['./bridges-mat-tab-nav-panel.component.css'],
})
export class BridgesMatTabNavPanelComponent implements OnDestroy {
  @Input() tabs!: BridgesMatTabNavData[];
  @Input() translationKeyPrefix!: string;

  private destroyed = new Subject<void>();

  activeTabRoute?: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map(
          (event: NavigationEnd) =>
            event.urlAfterRedirects.split('/').pop() ?? ''
        ),
        startWith(this.getActiveTabUrlSegmentFromActivatedRoute()),
        takeUntil(this.destroyed)
      )
      .subscribe((tabUrl) => (this.activeTabRoute = tabUrl));
  }

  private getActiveTabUrlSegmentFromActivatedRoute() {
    let activatedRouteSnapshot = this.route.snapshot;
    while (activatedRouteSnapshot.firstChild != null) {
      activatedRouteSnapshot = activatedRouteSnapshot.firstChild;
    }

    const lastUrlSegment =
      activatedRouteSnapshot.url[activatedRouteSnapshot.url.length - 1];
    return lastUrlSegment?.path || '';
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
