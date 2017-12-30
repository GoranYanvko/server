import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlesComponents } from './index';

@NgModule({
    declarations:[...ArticlesComponents],
    imports:[CommonModule, RouterModule],
    exports:[]
})

export class ArticlesComponentModule {

}
