export class PrototypeExam {
    id: number;
    nomPrototypeExam: string;
    examFile: string;
    correctionFile: string;
    correctionLink: string;
    order:number;
  
    constructor(id: number, nomPrototypeExam: string, examFile: string, correctionFile: string, correctionLink: string) {
      this.id = id;
      this.nomPrototypeExam = nomPrototypeExam;
      this.examFile = examFile;
      this.correctionFile = correctionFile;
      this.correctionLink = correctionLink;
    }
  }
  