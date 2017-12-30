import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { allServices } from './index';


@NgModule({
    imports:[
        CommonModule
    ],
    providers:[...allServices]
})

export class  ServicesModule {

}