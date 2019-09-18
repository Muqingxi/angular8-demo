# start
```
npm install -g @angular/cli
npm i
npm run dev
```

# use
```javascript
import {filter, map} from 'rxjs/operators'

this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.router)
).subscribe(() => {
    this.route.queryParams.subscribe((params: Params) => {
        let data = getData(this.router.routerState, this.router.routerState.root)
    })
})
```