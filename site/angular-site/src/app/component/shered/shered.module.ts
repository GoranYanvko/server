import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SheredComponents} from './index'
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[...SheredComponents],
    imports:[CommonModule, RouterModule],
    exports:[...SheredComponents]
})

export class SheredComponentModule {

}