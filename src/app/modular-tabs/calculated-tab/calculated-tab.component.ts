import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'calculated-tab',
  templateUrl: './calculated-tab.component.html',
  styleUrls: ['./calculated-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalculatedTabComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subscriptions: Subscription[] = [];

  matTabList: any;
  matTabLabelContainer: any;
  primary: any;
  primaryItems: any;
  secondaryItems: any;
  allItems: any;
  more: any;
  moreBtn: any;

  private viewportChange = this.viewportRuler
    .change(0)
    .subscribe(() => this.ngZone.run(() => this.onResize()));

  constructor(
    private viewportRuler: ViewportRuler,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    this.subscriptions.push(this.viewportChange);
  }

  ngAfterViewInit(): void {
    this.matTabList = document.getElementsByClassName('mat-tab-list')[0];
    this.renderer.addClass(this.matTabList, '--jsfied');
    this.matTabLabelContainer = document.getElementsByClassName(
      'mat-tab-label-container'
    )[0];
    this.primary =
      document.getElementsByClassName('mat-tab-labels')[0].childNodes;

    this.primaryItems = Array.from(
      document.getElementsByClassName('mat-tab-labels')[0].childNodes
    ).filter(
      (item: any) => item.tagName === 'DIV' && !item.classList.contains('-more')
    );

    this.generateDropdown();
    this.secondaryItems = document.getElementsByClassName('-secondary-item');
    this.allItems = document.getElementsByClassName('mat-tab-label');
    this.more = document.getElementsByClassName('-more');
    this.moreBtn = document.getElementsByClassName('select');

    this.moreBtn.onclick = (e: any) => {
      e.preventDefault();
      // --show-secondary to false
      this.matTabList.toggleClass('--show-secondary');
      this.setAttributeForAll(
        this.more,
        'aria-expanded',
        '' + this.matTabList.hasClass('--show-secondary')
      );
      if (this.matTabList.hasClass('--show-secondary')) {
        // $moreBtn.html(`More &uarr;`);
      } else {
        // $moreBtn.html(`More &darr;`);
      }
    };

    this.adapt();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onResize() {
    this.adapt();
  }

  adapt() {
    Array.from(this.allItems).forEach((el: any) => {
      this.renderer.removeClass(el, '--hidden');
    });

    let stopWidth = this.moreBtn[0].offsetWidth;
    let hiddenItems: any[] = [];
    let primaryWidth = this.matTabLabelContainer.offsetWidth;

    Array.from(this.primaryItems).forEach((el: any, i: number) => {
      if (primaryWidth >= stopWidth + (el.offsetWidth || 0)) {
        stopWidth += el.offsetWidth || 0;
      } else {
        this.renderer.addClass(el, '--hidden');
        hiddenItems.push(i);
      }
    });
    if (hiddenItems.length) {
      // if something is hidden
      // console.log(document.getElementsByClassName('select')[0]);
      // this.renderer.removeClass(document.getElementsByClassName('select')[0], '--hidden');
      Array.from(this.secondaryItems).forEach((el: any, i: number) => {
        if (!hiddenItems.includes(i)) {
          this.renderer.addClass(el, '--hidden');
        } else {
          this.renderer.removeClass(el, '--hidden');
        }
      });
    } else {
      // if nothing is hidden
      this.addClassForAll(this.more, '--hidden');
      this.renderer.removeClass(this.matTabList, '--show-secondary');
      this.setAttributeForAll(this.more, 'aria-expanded', 'false');
    }
  }

  generateDropdown() {
    var selectString =
      '<div class="-more" style="display: flex;"><select aria-haspopup="true" aria-expanded="false" class="select"><option value="x">>></option>';

    let allTabs: Option[] = Array.from(this.primary)
      .filter((x: any) => x.tagName == 'DIV')
      .map((x: any) => {
        return { id: x.id, title: x.children[0]?.innerText };
      });

    allTabs.forEach((element, i) => {
      selectString = selectString.concat(`
        <option class="-more -secondary-item" onclick="document.getElementById('${element.id}').click()" value="${i}">
        ${element.title}
        </option>
      `);
    });

    selectString = selectString.concat('</select></div>');
    this.primary[0].parentNode.insertAdjacentHTML('beforeend', selectString);
  }

  setAttributeForAll(elements: any, attribute: string, value: string) {
    Array.from(elements).forEach((x: any) => {
      x.setAttribute(attribute, value);
    });
  }

  addClassForAll(elements: any, className: string) {
    Array.from(elements).forEach((x: any) => {
      this.renderer.addClass(x, className);
    });
  }

  removeClassForAll(elements: any, className: string) {
    Array.from(elements).forEach((x: any) => {
      this.renderer.removeClass(x, className);
    });
  }
}

export interface Option {
  id: string;
  title: string;
}
