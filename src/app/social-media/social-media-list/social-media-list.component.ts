import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SocialMedia } from '../../shared/social-media';
import { SocialMediaType } from '../../shared/social-media-type';

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.scss']
})
export class SocialMediaListComponent implements OnInit {

  socialmedia: SocialMedia[];
  selectedSocialMedia: SocialMedia[];
  socialmediatypes: SocialMediaType[];
  filterBy: string = 'All';

  constructor(private router: Router, private apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.data.subscribe(data => {
      this.socialmedia = data['socialmedia'];

      // mockup data for the media types
      this.socialmedia.forEach(function (item, i, list) {
        if (item.url.search('facebook.com')>=0)
        {
          item.mediatype = 'Facebook';
        }
        else if (item.url.search('twitter.com')>=0)
        {
          item.mediatype = 'Twitter';
        }
      });
    });
    
    this.route.queryParams.subscribe((queryParams:any) => {
      if (queryParams.type === 'All')
      {
        this.selectedSocialMedia = this.socialmedia;
      }
      else
      {
        this.selectedSocialMedia = this.socialmedia.filter( s => s.mediatype === queryParams.type );
      }
     });

     this.route.data.subscribe(data => {
      this.socialmediatypes = data['socialmediatype'];
    });
  }

  UpdateSocialMediaTypeFilter(newSocialMediaType: string){
    this.filterBy = newSocialMediaType;
  }
  
}
