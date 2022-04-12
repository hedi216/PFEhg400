import {
  CompetitorPostsService,
  Likes,
} from 'src/app/services/competitor-posts.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-a-regarder',
  templateUrl: './a-regarder.component.html',
  styleUrls: ['./a-regarder.component.css'],
})
export class ARegarderComponent implements OnInit {
  //apiLikes: Observable<Likes[]>;
  //likespost: Likes[];

  constructor(
    private competitorPostsService: CompetitorPostsService,
    private router: Router
  ) {
    //this.apiLikes = this.competitorPostsService.getpostsliked();
  }
  likespost: any;
  ngOnInit(): void {
    this.listlikesposts();
  }

  listlikesposts(): void {
    this.competitorPostsService.getpostsliked().subscribe((res) => {
      this.likespost = res;
      console.log(this.likespost);
    });
  }

  deletelikes(id: string) {
    if (confirm('Are your sure you want to delete this post?')) {
      this.competitorPostsService.deletePosts(id).subscribe(
        () => {
          this.ngOnInit();
        },
        () => {
          alert('Error');
        }
      );
    }
  }
}
