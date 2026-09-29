import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../movie';
import { CurrentShow } from '../../current-show';
import { Seat } from '../../seat';
import { Generic } from '../../services/generic';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page2.html',
  styleUrl: './page2.css'
})
export class Page2 implements OnInit {
  movie?: Movie;

  currentShows: CurrentShow[] = [];
  showsLoaded: boolean = false;
  selectedCurrentShow?: CurrentShow;
  seats: Seat[] = [];
  seatsLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private movieRepository: Generic<Movie>,
    private currentShowRepository: Generic<CurrentShow>,private seatRepository: Generic<Seat>) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('movieId'));
    this.loadMovie(movieId);
    this.loadCurrentShows(movieId);
  }

  loadMovie(movieId: number): void
  {
    this.movieRepository.getById('Movies', movieId).subscribe({next: (movie) => {this.movie = movie;},
      error: (error) => {console.error('Could not load the selected movie:', error);}
    });
  }

  loadCurrentShows(movieId: number): void
  {
    this.currentShowRepository.getAll('CurrentShow').subscribe({next: (currentShows) => {
        this.currentShows = currentShows.filter(currentShow => currentShow.movieId === movieId);
        this.showsLoaded = true;
      },
      error: (error) => {console.error('Could not load CurrentShows:', error);
        this.showsLoaded = true;}
    });
  }

  selectCurrentShow(currentShow: CurrentShow): void
  {
    this.selectedCurrentShow = currentShow;
    this.seats = [];
    this.seatsLoaded = false;

    this.seatRepository.getAll('Seat').subscribe({
      next: (seats) => {this.seats = seats.filter(seat => seat.hallId === currentShow.hallId && seat.isAvailable);
        this.seatsLoaded = true;
      },
      error: (error) => {console.error('Could not load seats:', error);
        this.seatsLoaded = true;}
    });
  }
}