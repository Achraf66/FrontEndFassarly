import { Matiere } from "../matieres/Models/Matiere";

export class Examen{
    id: number;
    nomExamen: string;
    pieceJointes: string[];
    correction: string;
    videoLien: string;
    matieres: Matiere; 
}