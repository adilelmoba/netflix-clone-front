import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { State } from './model/state.model';
import { Movie, MovieApiResponse } from './model/movie.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  http = inject(HttpClient);

  baseURL = 'https://api.themoviedb.org';

  private fetchTrendMovie$: WritableSignal<State<MovieApiResponse, HttpErrorResponse>>
    = signal(State.Builder<MovieApiResponse, HttpErrorResponse>().forInit().build());
  fetchTrendMovie = computed(() => this.fetchTrendMovie$());

  getTrends() {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${environment.TMDB_API_KEY}`);
    this.http
        .get<MovieApiResponse>(`${this.baseURL}/3/trending/movie/day`, { headers })
        .subscribe({
          next: (tmdbResponse: MovieApiResponse) => {
            this.fetchTrendMovie$.set(State.Builder<MovieApiResponse, HttpErrorResponse>().forSuccess(tmdbResponse).build());
          },
          error: (err) => {
            this.fetchTrendMovie$.set(State.Builder<MovieApiResponse, HttpErrorResponse>().forError(err).build());
          }
        })
  };

  getImageURL(id: string, size: 'original' | 'w-500' | 'w-200'): string {
    return `https://image.tmdb.org/t/p/${size}/${id}`;
  }

  constructor() { }
}
