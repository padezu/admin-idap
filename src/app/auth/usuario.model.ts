import { Menu } from "./menu.model";


export class Usuario{

    Adm_IDUsua: string;
    Adm_Estatu: string;
    Adm_UsTipo: string;
    Adm_Sucurs: string;
    Adm_ApiKey: string;
    Adm_Menus?: [Menu];

    constructor(userResponse: any){

        this.Adm_IDUsua  = userResponse.Adm_IDUsua
        this.Adm_Estatu  = userResponse.Adm_Estatu
        this.Adm_UsTipo  = userResponse.Adm_UsTipo
        this.Adm_Sucurs  = userResponse.Adm_Sucurs
        this.Adm_ApiKey  = userResponse.Adm_ApiKey


    }

}