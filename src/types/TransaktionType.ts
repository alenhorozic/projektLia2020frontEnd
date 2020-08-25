import TransaktionTypeType from "./TransaktionTypeType";

export default class TransaktionType {
    transaktionId?: number;
    createdAt?: string;
    transaktionTypeId?: number;
    accauntId?: number;
    amount?: number;
    userId?: number;
    transaktionType?: TransaktionTypeType;
}
