import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Gards} from './index'

@NgModule({
    imports:[ ],
    providers:[...Gards],
    exports:[CommonModule]
})

export class GardsModule {

}