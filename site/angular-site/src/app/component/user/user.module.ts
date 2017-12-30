import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponents } from './index';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule, FormsModule
    ],
    declarations:[...UserComponents]
})

export class UserModule {

}