export interface FilterProps{
    valitor?:Array<string>;
    data?:string;
    type?:'primary'|'success'|'warning'|'danger'|'info';
    opthions?:IFilterXSSOptions;
}

import type { IFilterXSSOptions } from "xss";
