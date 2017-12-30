import {Routes} from '@angular/router';

//Components
import { AppComponent } from './app.component';
import {HomeComponent} from './component/home/home.component'
import { ProductComponent } from './component/product/product.component';
import { ArticleComponent } from './component/article/article.component';
import { ContactComponent } from './component/contact/contact.component';
import { FaqComponent } from './component/faq/faq.component';
import { PolesnoComponent } from './component/polesno/polesno.component';
import { LoginComponent } from './component/user/login/login.component';
import {AdminComponent} from './component/admin/admin.component';

//Gards
import {AdminGards} from './gards/admin.gards'
//Services

import {AuthServices} from './core/service/auth.service'
import { LastStepOrderComponent } from './component/last-step-order/last-step-order.component';
import { CartComponent } from './component/cart/cart.component';
import { SingelArticleComponent } from './component/article/singel-article/singel-article.component';



export const routes = [
    {path:'', component: HomeComponent},
    {path:'home', component: HomeComponent},
    {path:'product/:url', component: ProductComponent},
    {path:'article', component: ArticleComponent},
    {path:'contact', component: ContactComponent},
    {path:'faq', component: FaqComponent},
    {path:'polesno', component: PolesnoComponent},
    {path:'login', component: LoginComponent},
    {path:'goran', component: AdminComponent, canActivate: [AdminGards] },
    {path: 'last-step-order', component: LastStepOrderComponent},
    {path: 'cart', component: CartComponent},
    {path: 'article/top/:url', component: SingelArticleComponent},
 

    { path: '**', redirectTo: '', pathMatch: 'full' }

]