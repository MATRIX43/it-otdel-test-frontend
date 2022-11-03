import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostApiService } from './services/post-api.service';
import { Post } from './interfaces/post';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dashboard';

  public posts: Array<Post> = [];
  public msgTextCtrl: FormControl<string | null> = new FormControl<string>('', Validators.required) ;

  private unsub$: Subject<void> = new Subject();

  constructor(
    private postService: PostApiService,
  ) {
  }

  ngOnInit(): void {
    of(1)
      .pipe(
        mergeMap(() => this.getPosts())
      )
      .subscribe()
  }

  search(str: string): void { // filter
    this.postService.search({ field: 'message', val: str })
      .pipe(
        tap((p) => {
          this.posts = p
        })
      ).subscribe()
  }

  getPosts(): Observable<Post[]> {
    return this.postService.getAll()
      .pipe(
        tap((p) => {
          this.posts = p
        })
      )
  }

  ngOnDestroy(): void {
      this.unsub$.next();
      this.unsub$.complete();
  }

  onSave() {
    return this.postService.createOne({ author: 'ME', message: this.msgTextCtrl.value as string })
      .pipe(
        tap(() => this.msgTextCtrl.reset()),
        mergeMap(() => this.getPosts()),
      )
      .subscribe();
  }

  resetFilter() {
    this.getPosts()
      .subscribe()
  }
}
