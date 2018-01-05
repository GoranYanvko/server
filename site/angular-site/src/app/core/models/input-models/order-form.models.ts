export class OrderFormModel {
    constructor(
        public firstName:String,
        public lastName:String,
        public phone: String,
        public email: String,
        public city: String,
        public typeOfDelivary: String,
        public address: String,
        public confirmConditions: Boolean
    ) {}
}