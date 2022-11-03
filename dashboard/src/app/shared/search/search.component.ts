import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() onChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();

  raw = new FormControl<string>('', [Validators.required]);

  private unsub$: Subject<void> = new Subject<void>();
  constructor() { }

  ngOnInit(): void {
    this.raw.valueChanges
      .pipe(
        filter((v) => !(v as string).length),
        tap(() => this.onClear.emit())
      )
      .subscribe();

    /* Search on the fly - REACTIVE - uncomment me if needed
    this.raw.valueChanges
      .pipe(
        takeUntil(this.unsub),
        filter(v => v!.length > 2),
        debounceTime(500),
        map((raw) => {
          this.onChanged.emit(raw!)
        }),
      ).subscribe();
*/

  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  search() {
    if (!this.raw.valid) {
      return
    }
    this.onChanged.emit(this.raw.value!)
  }
}
