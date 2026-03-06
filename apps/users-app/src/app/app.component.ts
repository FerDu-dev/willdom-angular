import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '@willdom-test/users-lib';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRoot],
  selector: 'app-root',
  template: `
    <tui-root>
      <router-outlet></router-outlet>
    </tui-root>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.initAuth());
  }
}
