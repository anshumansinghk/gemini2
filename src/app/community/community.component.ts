import { Component } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { discussionTopicsDetails } from './models/community.model';
import { post } from './models/community.model';
import { CommunityServiceService } from './services/community-service.service';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ss-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  discussionTopicsData: discussionTopicsDetails[];
  postTopicdata: post;
  loading: boolean = false
  pagetype: string = 'Discussion'
  constructor(private CommunityServiceService: CommunityServiceService, private HeaderService: HeaderService, public router: Router,) {
  }
  ngOnInit() {
    this.getDiscussionTopics()
  }
  getDiscussionTopics() {
    this.loading = true;
    this.CommunityServiceService.getDiscussionTopics().subscribe(
      result => {
        this.discussionTopicsData = result.data.discussion_topics
        this.loading = false
      },
    );
  }

  PostTopicPage(id: string, itemTitle: string) {
    let params = { 'id': id, 'itemTitle': itemTitle }
    let Route = 'community/communitypost';
    this.router.navigate([Route], { queryParams: params });
    // let route = 'community/communitypost/'+id;
    // this.router.navigate([route]);
  }

  pageType(type: string) {
    if (type == 'Discussion') {
      this.pagetype = 'Discussion'
    }
    else {
      this.pagetype = '0'

    }
  }
}
