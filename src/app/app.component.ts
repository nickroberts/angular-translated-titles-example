import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { map, filter, mergeMap } from "rxjs/operators";
import { Subscription } from "rxjs";

import { TranslationService } from "angular-l10n";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  routerEventSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translationService: TranslationService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.routerEventSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const { title } = event;
        console.log("AppComponent: page title", title);
        const translatedTitle = this.translationService.translate(title);
        console.log("AppComponent: translated page title", translatedTitle);
        this.titleService.setTitle(translatedTitle);
      });
  }

  ngOnDestroy() {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
  }
}
