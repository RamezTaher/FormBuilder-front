import { IBase } from "./base";
import { IUser } from "./user";
import { IField } from "./field";
import { IFormTitle } from "./form-title";
import { IGroupType } from "./group-type";
import { IFieldGroup } from "./field-group";
export interface IForm extends IBase {
    owner: IUser;
    titles: IFormTitle[];
    description: string;
    fields: IField[];
    groupTypes: IGroupType[];
    groups: IFieldGroup[];
    isLive: boolean;
    translations: string[];
    defaultLanguage: string;
}
