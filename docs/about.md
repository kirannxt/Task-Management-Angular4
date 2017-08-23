
## The Details around this project

### Construct by Angular Material

#### Initial Layout

Creae the 'core' module, and 'app' import it, in the 'core'
create the components 'header', 'footer', and 'sidebar' components, let 'core' import them and export them, thus 'app' module will access these components.

familiar with flex layout
justify-conetent: flex-start; layout the items in horizontal direction.

align-content: flex-end; layout the items in vertical direction

align-items: center; // layout the items in one row line.

add '#sidenav' to refer to the target element.

```
<md-sidenav #sidenav mode="over" align="start">
    <app-sidebar></app-sidebar>
</md-sidenav>
```

style.scss need to import the material theme

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

in 'core.module.ts' import 

```
import { MdToolbarModule } from '@angular/material';
```

and then, 

in the sub component use its component

```
<md-toolbar color="primary"></md-toolbar>
```

if want to put the element center position

```
.fill-remaining-space {
    flex: 1 1 auto;
}
```

#### Transmit the data(method) from one component to parent one.

firstly, define the method needed to emmit

``
@Output() toggle = new EventEmitter<void>();
```

and then let the target element (its parent element) receive it.

```
<app-header (toggle)="sidenav.toggle()"></app-header>

```

#### Create the self-defined icon font

Here I also use icon font from 'iconfont.com', so I need to import the needed svg file to '/assets'
directory. 

and I create one 'utils/svg.util.ts' utility files, in which to make the util functions

```
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MdIconRegistry, ds: DomSanitizer) => {
    ir.addSvgIcon('menu', ds.bypassSecurityTrustResourceUrl('assets/menu.svg'));
}
```

and other files will import it, here I let 'core.module.ts' import it.

```
constructor(@Optional() @SkipSelf() parent: CoreModule, 
                                      ir: MdIconRegistry,
                                      ds: DomSanitizer) {
    if (parent) {
      throw Error('module existed, cannot load again');
    }
    loadSvgResources(ir, ds);
  }
```
at last, header.component.ts will use it 

```
<md-icon svgIcon="menu"></md-icon>
```

#### Distach the routing files in different modules

firstly, create the '/shared' module to import and export the shared modules such as 'MdToolbarModule,MdIconModule, MdButtonModule, MdCardModule, MdInputModule', thus many modules can just import this 'shared' moduel.
secondly, create the '/login' module and component, used to complete the login page.
thirdly, create the 'login-routing.module.ts' and 'app-routing.module.ts' to match the respectively module.ts. and then let the 'app.module.ts' import the 'login.module.ts'.

#### Modify the Login page by md-card tag

here, just be familiar with the 'md-card' constructure.

#### Create the sidebar

here, I use md-nav-list to create sidebar, and use the foreach function to show the realtime date on the md-icon, which are imported from '/utils/svg.util.ts'.

#### Create the self-define material theme

create the '/theme.scss' define my theme.

```

@import '~@angular/material/theming';

@include mat-core();


// define the light theme
$my-app-primary: mat-palette($mat-indigo);
$my-app-accent: mat-palette($mat-pink, A200, A100, A100);
$my-app-warn: mat-palette($mat-red);

$my-app-theme: mat-light-theme($my-app-primary, $my-app-accent, $my-app-warn);

@include angular-material-theme($my-app-theme);


// define the dark theme
$my-dark-primary: mat-palette($mat-blue-grey);
$my-dark-accent: mat-palette($mat-amber, A200, A100, A100);
$my-dark-warn: mat-palette($mat-orange);

$my-dark-theme: mat-light-theme($my-dark-primary, $my-dark-accent, $my-dark-warn);

.myapp-dark-theme {
    @include angular-material-theme($my-dark-theme);
}
```

here I define two theme, and assign the second one to classname'myapp-dark-theme'.

provide 
```
<md-sidenav-container [class.myapp-dark-theme]="darkTheme">
```
to let the whole project switch each other. Here also notice the data transimit from child 'header' component to parent 'app' component by EventEmmiter().

#### Create the md-grid-list in 'register' page

here I define the 'avatars' array in 'svg.util.ts', and let the register 'md-grid-tile' component import it.

```
...
const avatarDir = `${imgDir}/avatar`;
ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
...
```
in 'register.component.html'

```
<md-grid-list cols="4" rowHeight="1:1">
    <!-- <md-grid-tile colspan="2">1</md-grid-tile> -->
    <!-- <md-grid-tile rowspan="2">5</md-grid-tile> -->
    <md-grid-tile *ngFor="let item of items">
        <md-icon class="avatar" [svgIcon]="item"></md-icon>
    </md-grid-tile>
</md-grid-list>
```





