import { Component, OnInit } from '@angular/core';
import { CompetitorService } from 'src/app/services/competitor.service';

@Component({
  selector: 'app-liste-concurents',
  templateUrl: './liste-concurents.component.html',
  styleUrls: ['./liste-concurents.component.css'],
})
export class ListeConcurentsComponent implements OnInit {
  apiCompititors: any;

  constructor(private competitorService: CompetitorService) {}
  ngOnInit(): void {
    this.listcomp();
  }

  listcomp(): void {
    this.competitorService.getcompetitors().subscribe((res) => {
      this.apiCompititors = res;
      
    });
  }
}
