import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SocialMediaType } from '../../view-models/social-media-type';
import { AppInsightsService } from '../../services/applicationInsights.service';
import { AppInsights } from 'applicationinsights-js';

@Component({
  selector: 'app-hq-dashboard-sub-menu',
  templateUrl: './hq-dashboard-sub-menu.component.html',
  styleUrls: ['./hq-dashboard-sub-menu.component.scss']
})
export class HqDashboardSubMenuComponent implements OnInit {
  @Input() socialmediatypes: SocialMediaType[];
  @Input() userMinistriesForFilteringPosts: Array<string>;
  @Input() userMinistriesForFilteringActivities: Array<string>;
  filterBySocialMediaType: string;
  filterPostsByUserMinistries: string;
  filterActivitiesByUserMinistries: string;
  ministryFilterDisplayValue: string;
  currentUrl = '';
  submenuOpen = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appInsightsService: AppInsightsService) {
    if (!window['appInsights'].config) {
      // Setup Application Insights within the Angular Application
      window['appInsights'].loadAppInsights();
    }

  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe((queryParams: any) => {
        this.filterBySocialMediaType = queryParams.type || 'All';
        this.filterPostsByUserMinistries = queryParams.ministries || 'All';
        this.filterActivitiesByUserMinistries = queryParams.ministries || 'All';
      });
    }
  }

  updateSocialMediaType(newType: string) {
    this.filterBySocialMediaType = newType;
  }

  print() {
    window.print();
    this.appInsightsService.logEvent('Print Event');
    //window['appInsights'].trackEvent({name: 'Print Event'});
  }

  toggleSubmenu() {
    if(this.submenuOpen) {
      return;
    }
    this.submenuOpen = !this.submenuOpen;
  }
}
