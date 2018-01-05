import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class SeoServices {
    constructor(private title: Title, private meta: Meta) {}

    public changeTitle(title) {
        return this.title.setTitle(title);
    }

    public addMetaDescription(description) {        
        if (this.meta.getTag("name='description'") === null) {
            this.meta.addTag({name:'description', content:description});
       } else {
           this.meta.updateTag({name:'description', content:description})
       }     
    }

    public addMetaKeys(keys) {        
        if (this.meta.getTag("name='keywords'") === null) {
            this.meta.addTag({name:'keywords', content:keys});
       } else {
           this.meta.updateTag({name:'keywords', content:keys})
       }     
    }
}