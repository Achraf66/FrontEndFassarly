import { Matiere } from "../matieres/Models/Matiere";
import { PrototypeExam } from "../prototypeExam/models/PrototypeExam";

export class Examen{
    id: number;
    nomExamen: string;
    matieres: Matiere; 
    prototypeExams: PrototypeExam[];
    order :number;
}