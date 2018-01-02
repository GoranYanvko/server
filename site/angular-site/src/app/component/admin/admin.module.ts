import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AdminComponents } from './index';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewArticleComponent } from './new-article/new-article.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    declarations:[...AdminComponents, NewArticleComponent, OrdersComponent],
    imports:[CommonModule, RouterModule, FormsModule]
    
})

export class AdminComponentModule {

}