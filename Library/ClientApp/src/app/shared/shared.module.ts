import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2CompleterModule } from 'ng2-completer';


import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    imports: [
        Ng2CompleterModule
    ],
    exports: [ CommonModule, DropdownDirective, Ng2CompleterModule ]
})

export class SharedModule{}