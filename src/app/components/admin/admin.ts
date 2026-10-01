import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../movie';
import { Hall } from '../../hall';
import { Generic } from '../../services/generic';
import { Seat } from '../../seat';
import { CurrentShow } from '../../current-show';
import { Booking } from '../../booking';
import { Person } from '../../person';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  movies: Movie[] = [];
  newMovie: Movie = new Movie();
  halls: Hall[] = [];
  newHall: Hall = new Hall();
  seats: Seat[] = [];
  newSeat: Seat = new Seat();
  currentShows: CurrentShow[] = [];
  newCurrentShow: CurrentShow = new CurrentShow();
  bookings: Booking[] = [];
  persons: Person[] = [];

  constructor(private movieRepository: Generic<Movie>, private hallRepository: Generic<Hall>,
    private seatRepository: Generic<Seat>, private currentShowRepository: Generic<CurrentShow>,
    private bookingRepository: Generic<Booking>, private personRepository: Generic<Person>) {}

  ngOnInit(): void { this.loadMovies(); this.loadHalls(); this.loadSeats(); this.loadCurrentShows(); this.loadBookings();
    this.loadPersons(); }

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

  deleteMovie(movieId: number): void {
    const shouldDelete = confirm(
      'Are you sure you want to delete this movie?'
    );

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

  loadHalls(): void {
    this.hallRepository.getAll('Hall').subscribe({
      next: (halls) => {
        this.halls = halls;
      },
      error: (error) => {
        console.error('Could not load halls:', error);
      }
    });
  }

  addHall(): void {
    this.hallRepository.create('Hall', this.newHall).subscribe({
      next: () => {
        alert('Hall added successfully!');
        this.newHall = new Hall();
        this.loadHalls();
      },
      error: (error) => {
        console.error('Could not add hall:', error);
      }
    });
  }

  updateHall(hall: Hall): void {
  this.hallRepository
    .update('Hall', hall.hallId, hall)
    .subscribe({
      next: () => {
        alert('Hall updated successfully!');
        this.loadHalls();
      },
      error: (error) => {
        console.error('Could not update hall:', error);
      }
    });
}

deleteHall(hallId: number): void {
  const shouldDelete = confirm(
    'Are you sure you want to delete this hall?'
  );

  if (!shouldDelete) {
    return;
  }

  this.hallRepository.delete('Hall', hallId).subscribe({
    next: () => {
      alert('Hall deleted successfully!');
      this.loadHalls();
    },
    error: (error) => {
      console.error('Could not delete hall:', error);
      alert('This hall may have seats or showings connected to it.');
    }
  });
}

loadSeats(): void {
  this.seatRepository.getAll('Seat').subscribe({
    next: (seats) => {
      this.seats = seats;
    },
    error: (error) => {
      console.error('Could not load seats:', error);
    }
  });
}

addSeat(): void {
  this.seatRepository.create('Seat', this.newSeat).subscribe({
    next: () => {
      alert('Seat added successfully!');
      this.newSeat = new Seat();
      this.loadSeats();
    },
    error: (error) => {
      console.error('Could not add seat:', error);
      alert(error.error);
    }
  });
}

updateSeat(seat: Seat): void {
  this.seatRepository
    .update('Seat', seat.seatId, seat)
    .subscribe({
      next: () => {
        alert('Seat updated successfully!');
        this.loadSeats();
      },
      error: (error) => {
        console.error('Could not update seat:', error);
        alert(error.error);
      }
    });
}

deleteSeat(seatId: number): void {
  const shouldDelete = confirm(
    'Are you sure you want to delete this seat?'
  );

  if (!shouldDelete) {
    return;
  }

  this.seatRepository.delete('Seat', seatId).subscribe({
    next: () => {
      alert('Seat deleted successfully!');
      this.loadSeats();
    },
    error: (error) => {
      console.error('Could not delete seat:', error);
      alert('This seat may be connected to an existing booking.');
    }
  });
}

loadCurrentShows(): void {
  this.currentShowRepository.getAll('CurrentShow').subscribe({
    next: (currentShows) => {
      this.currentShows = currentShows;
    },
    error: (error) => {
      console.error('Could not load CurrentShows:', error);
    }
  });
}

addCurrentShow(): void {
  this.currentShowRepository
    .create('CurrentShow', this.newCurrentShow)
    .subscribe({
      next: () => {
        alert('Showtime added successfully!');
        this.newCurrentShow = new CurrentShow();
        this.loadCurrentShows();
      },
      error: (error) => {
        console.error('Could not add showtime:', error);
        alert(error.error);
      }
    });
}
updateCurrentShow(currentShow: CurrentShow): void {
  this.currentShowRepository
    .update(
      'CurrentShow',
      currentShow.currentShowId,
      currentShow
    )
    .subscribe({
      next: () => {
        alert('Showtime updated successfully!');
        this.loadCurrentShows();
      },
      error: (error) => {
        console.error('Could not update showtime:', error);
        alert(error.error);
      }
    });
}

deleteCurrentShow(currentShowId: number): void {
  const shouldDelete = confirm(
    'Are you sure you want to delete this showtime?'
  );

  if (!shouldDelete) {
    return;
  }

  this.currentShowRepository
    .delete('CurrentShow', currentShowId)
    .subscribe({
      next: () => {
        alert('Showtime deleted successfully!');
        this.loadCurrentShows();
      },
      error: (error) => {
        console.error('Could not delete showtime:', error);
        alert('This showtime may have bookings connected to it.');
      }
    });
}

loadBookings(): void {
  this.bookingRepository.getAll('Booking').subscribe({
    next: (bookings) => {
      this.bookings = bookings;
    },
    error: (error) => {
      console.error('Could not load bookings:', error);
    }
  });
}

deleteBooking(bookingId: number): void {
  const shouldDelete = confirm(
    'Are you sure you want to cancel this booking?'
  );

  if (!shouldDelete) {
    return;
  }

  this.bookingRepository.delete('Booking', bookingId).subscribe({
    next: () => {
      alert('Booking cancelled successfully!');
      this.loadBookings();
    },
    error: (error) => {
      console.error('Could not cancel booking:', error);
    }
  });
}

loadPersons(): void {
  this.personRepository.getAll('Person').subscribe({
    next: (persons) => {
      this.persons = persons;
    },
    error: (error) => {
      console.error('Could not load customers:', error);
    }
  });
}

updatePerson(person: Person): void {
  this.personRepository
    .update('Person', person.id, person)
    .subscribe({
      next: () => {
        alert('Customer updated successfully!');
        this.loadPersons();
      },
      error: (error) => {
        console.error('Could not update customer:', error);
      }
    });
}

deletePerson(personId: number): void {
  const shouldDelete = confirm(
    'Are you sure you want to delete this customer?'
  );

  if (!shouldDelete) {
    return;
  }

  this.personRepository.delete('Person', personId).subscribe({
    next: () => {
      alert('Customer deleted successfully!');
      this.loadPersons();
    },
    error: (error) => {
      console.error('Could not delete customer:', error);
      alert('Delete the customer’s booking before deleting the customer.');
    }
  });
}
}