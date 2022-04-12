import { Competitor } from './../../../services/competitor.service';
import { Observable } from 'rxjs';
import { CompetitorPost } from './../../../services/competitor-posts.service';
import { Component, OnInit } from '@angular/core';
import { CompetitorService } from 'src/app/services/competitor.service';
import { CompetitorPostsService } from 'src/app/services/competitor-posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css'],
})
export class ActiviteComponent implements OnInit {
  posts: CompetitorPost[] = [];
  apiCompititors: Observable<Competitor[]>;
  searchForm = new FormGroup({
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required]),
    competitorName: new FormControl(),
    type: new FormControl(),
  });
  couleur: string = '';
  constructor(
    private competitorService: CompetitorService,
    private CompetitorPostsService: CompetitorPostsService
  ) {
    this.apiCompititors = this.competitorService.getcompetitors();
  }

  ngOnInit(): void {}
  searchPosts() {
    const { start, end, competitorName, type } = this.searchForm.value;
    //console.table({ start, end, competitorName, type });
    if (this.searchForm.valid) {
      this.CompetitorPostsService.fetchPosts(
        competitorName,
        type,
        start,
        end
      ).subscribe(
        (data: CompetitorPost[]) => {
          console.log(data);
          this.posts = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  sendRegarder(link: string) {
    this.CompetitorPostsService.regarderPost(link).subscribe(
      () => {
        this.couleur = 'primary';
        alert(' ajouter a la liste a regarder  tard ');
      },
      () => {
        alert('Error');
      }
    );
  }
}
