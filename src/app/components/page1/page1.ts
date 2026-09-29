import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../movie';
import { Generic } from '../../services/generic';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page1.html',
  styleUrl: './page1.css'
})
export class Page1 implements OnInit {
  movies: Movie[] = [];

  constructor(private movieRepository: Generic<Movie>,private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
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

  bookMovie(movieId: number): void {
    this.router.navigate(['/page2', movieId]);
  }
}