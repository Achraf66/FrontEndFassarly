import { Matiere } from "../../matieres/Models/Matiere";

export class SeanceEnLigne {
    id: number;
    date: string | null;
    heureDebut: string;
    heureFin: string;
    titre: string;
    lienZoom: string;
    matieres: Matiere;
}  