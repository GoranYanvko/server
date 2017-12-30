import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeComponents } from './index';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[...HomeComponents],
    imports:[CommonModule, RouterModule, FormsModule],
})

export class HomeComponentModule {

}