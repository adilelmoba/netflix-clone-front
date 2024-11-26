import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { TmdbService } from '../../service/tmdb.service';
import { Movie } from '../../service/model/movie.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-more-infos',
  standalone: true,
  imports: [
    DatePipe,
  ],
  templateUrl: './more-infos.component.html',
  styleUrl: './more-infos.component.scss'
})
export class MoreInfosComponent implements OnInit, OnDestroy {

  public movieId = -1;

  tmdbService = inject(TmdbService);

  movie: Movie | undefined;

  getMovieById() {
     this.tmdbService.getMovieById(this.movieId);
  }
  
  ngOnInit(): void {
    this.getMovieById();
  }

  constructor() {
    effect(() => {
      this.movie = this.tmdbService.movieById().value;
    });
  }

  ngOnDestroy(): void {
    this.tmdbService.clearGetMovieById();
  }

}
