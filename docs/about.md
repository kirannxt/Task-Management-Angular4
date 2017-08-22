
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



