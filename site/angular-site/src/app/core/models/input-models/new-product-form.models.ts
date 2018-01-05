export class NewProductModel {
    constructor(
        public title:String,
        public type: String,
        public img: String,
        public zakupnaCena: Number,
        public price: Number,
        public quality: Number,
        public description: String,
        public prednaznachenieString: String,
        public sydyrjanie: String,
        public onFirstPage:Boolean,
        public url:String,
        public upotreba:String,
        public keywordsString: String,
    ) {}
}