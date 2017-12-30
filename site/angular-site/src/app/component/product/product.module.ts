import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponents} from './index'
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
    declarations:[...ProductComponents],
    imports:[CommonModule, FormsModule, FlashMessagesModule],
    exports:[]
})

export class ProductComponentModule {

}