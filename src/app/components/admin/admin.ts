import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../movie';
import { Generic } from '../../services/generic';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  movies: Movie[] = [];
  newMovie: Movie = new Movie();

  constructor(
    private movieRepository: Generic<Movie>
  ) {}

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

  addMovie(): void {
    this.movieRepository.create('Movies', this.newMovie).subscribe({
      next: () => {
        alert('Movie added successfully!');
        this.newMovie = new Movie();
        this.loadMovies();
      },
      error: (error) => {
        console.error('Could not add movie:', error);
      }
    });
  }

  deleteMovie(movieId: number): void {
  const shouldDelete = confirm('Are you sure you want to delete this movie?');

  if (!shouldDelete) {
    return;
  }

  this.movieRepository.delete('Movies', movieId).subscribe({
    next: () => {
      alert('Movie deleted successfully!');
      this.loadMovies();
    },
    error: (error) => {
      console.error('Could not delete movie:', error);
    }
  });
}

updateMovie(movie: Movie): void {
  this.movieRepository
    .update('Movies', movie.movieId, movie)
    .subscribe({
      next: () => {
        alert('Movie updated successfully!');
        this.loadMovies();
      },
      error: (error) => {
        console.error('Could not update movie:', error);
      }
    });
}
}