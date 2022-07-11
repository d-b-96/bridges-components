import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'calculated-tab-example',
  templateUrl: './calculated-tab-example.component.html',
  styleUrls: ['./calculated-tab-example.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalculatedTabExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $(() => {
      $('nav.tabs').addClass('--jsfied');

      let $container = $('.tabs');
      let $primary = $container.find('.-primary');
      let $primaryItems = $container.find('.-primary > .li:not(.-more)');

      // Add More button
      $primary.append(`
        <div class="-more li">
          <button type="button" aria-haspopup="true" aria-expanded="false">
            More &darr;
          </button>
          <div class="-secondary">
            ${$primary.html()}
          </div>
        </div>
      `);

      let $secondary = $container.find('.-secondary');
      let $secondaryItems = $secondary.find('.li');
      let $allItems = $container.find('.li');
      let $moreLi = $('.-more');
      let $moreBtn = $('button');

      $moreBtn.on('click', (e: any) => {
        e.preventDefault();

        // --show-secondary to false
        $container.toggleClass('--show-secondary');
        $moreBtn.attr(
          'aria-expanded',
          '' + $container.hasClass('--show-secondary')
        );
        if ($container.hasClass('--show-secondary')) {
          $moreBtn.html(`More &uarr;`);
        } else {
          $moreBtn.html(`More &darr;`);
        }
      });

      function doAdapt() {
        $allItems.each((i: number, el: any) => {
          $(el).removeClass('--hidden');
        });

        let stopWidth = $moreBtn.outerWidth();
        let hiddenItems: any[] = [];
        let primaryWidth = $primary.outerWidth();

        $primaryItems.each((i: any, el: any) => {
          if (primaryWidth && stopWidth) {
            if (primaryWidth >= stopWidth + ($(el).outerWidth() || 0)) {
              stopWidth += $(el).outerWidth() || 0;
            } else {
              $(el).addClass('--hidden');
              hiddenItems.push(i);
            }
          }
        });

        if (!hiddenItems.length) {
          $moreLi.addClass('--hidden');
          $container.removeClass('--show-secondary');
          $moreBtn.attr('aria-expanded', 'false');
        } else {
          // $secondary = $container.find('.-secondary');
          // $secondaryItems = $secondary.find('.li');
          $secondaryItems.each((i: any, el: any) => {
            if (!hiddenItems.includes(i)) {
              $(el).addClass('--hidden');
            }
          });
        }
      }
      doAdapt();
      $(window).on('resize', doAdapt);
    });
  }
}
