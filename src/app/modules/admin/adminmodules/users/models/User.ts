import { Comptabilite } from "./Comptabilite";
import { Role } from "./Role";

export class User{ 

        id: number;
        nomPrenom :string;
        numeroTel:string;
        photo:string;
        smsVerified:boolean;
        dateCreation:string;
        roles:Role[];
        comptabilites:Comptabilite[]

}