import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../movie';
import { CurrentShow } from '../../current-show';
import { Seat } from '../../seat';
import { Generic } from '../../services/generic';
import { Booking } from '../../booking';
import { FormsModule } from '@angular/forms';
import { Person } from '../../person';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  bookedSeatIds: number[] = [];
  selectedSeat?: Seat;
  newPerson: Person = new Person();
  confirmBooking(): void {
  const currentShow = this.selectedCurrentShow;
  const seat = this.selectedSeat;
  
  if (this.newPerson.name === '' || this.newPerson.email === '' || this.newPerson.age <= 0) {
  alert('Please fill in all customer information.');
  return;
}

if (this.movie && this.newPerson.age < this.movie.requiredAge) {
  alert('You do not meet the required age for this movie.');
  return;
}

  if (!currentShow || !seat) {
    return;
  }

  this.personRepository.create('Person', this.newPerson).subscribe({
    next: (createdPerson) => {
      console.log('Created person:', createdPerson);
      const booking = new Booking();

      booking.personId = createdPerson.id;
      booking.currentShowId = currentShow.currentShowId;
      booking.seatId = seat.seatId;
      booking.bookingDate  = new Date().toISOString();
      console.log('Booking being sent:', booking);
      this.bookingRepository.create('Booking', booking).subscribe({
        next: () => {
          alert('Booking created successfully!');

          this.bookedSeatIds.push(seat.seatId);
          this.selectedSeat = undefined;
          this.newPerson = new Person();
        },
        error: (error) => {
  console.error('Could not create booking:', error.error);
  alert(error.error);
}
      });
    },
    error: (error) => {
      console.error('Could not create person:', error);
    }
  });
}

  constructor(
  private route: ActivatedRoute, private movieRepository: Generic<Movie>,
  private currentShowRepository: Generic<CurrentShow>, private seatRepository: Generic<Seat>,
  private bookingRepository: Generic<Booking>, private personRepository: Generic<Person>) {}

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

  selectCurrentShow(currentShow: CurrentShow): void {
  this.selectedCurrentShow = currentShow;
  this.selectedSeat = undefined;
  this.seats = [];
  this.bookedSeatIds = [];
  this.seatsLoaded = false;

  this.bookingRepository.getAll('Booking').subscribe({
    next: (bookings) => {
      this.bookedSeatIds = bookings
        .filter(booking =>
          booking.currentShowId === currentShow.currentShowId
        )
        .map(booking => booking.seatId);

      this.loadSeats(currentShow.hallId);
    },
    error: (error) => {
      console.error('Could not load bookings:', error);
    }
  });
}

loadSeats(hallId: number): void {
  this.seatRepository.getAll('Seat').subscribe({
    next: (seats) => {
      this.seats = seats.filter(
        seat => seat.hallId === hallId && seat.isAvailable
      );

      this.seatsLoaded = true;
    },
    error: (error) => {
      console.error('Could not load seats:', error);
      this.seatsLoaded = true;
    }
  });
}

isSeatBooked(seatId: number): boolean {
  return this.bookedSeatIds.includes(seatId);
}
selectSeat(seat: Seat): void {
  if (!this.isSeatBooked(seat.seatId)) {
    this.selectedSeat = seat;
  }
}
}