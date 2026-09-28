import { CommonModule } from '@angular/common';
import { Component, afterNextRender } from '@angular/core';
import { Movie } from '../../movie';
import { Generic } from '../../services/generic';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page1.html',
  styleUrl: './page1.css'
})
export class Page1 {
  movies: Movie[] = [];

  constructor(private movieRepository: Generic<Movie>) {
    afterNextRender(() => {
      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.movieRepository.getAll('Movies').subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (error) => {
        console.error('Could not load movies:', error);
      }
    });
  }
}