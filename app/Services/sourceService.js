import GroupRepository from '../Repositories/groupRepository';
import * as Exceptions from '../Exceptions/exceptions';
import SourceRepository from '../Repositories/sourceRepositroy';
import SourceModel from "../Models/sourceModel";

export default class AccountService{
    constructor() {
        this.repository = new SourceRepository();
    }
}