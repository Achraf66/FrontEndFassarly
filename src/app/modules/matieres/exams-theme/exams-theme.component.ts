import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Examen } from '../../admin/adminmodules/exams/Examen';
import { ExamenService } from '../../admin/adminmodules/exams/service/examen.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TreeNodeSelectEvent } from 'primeng/tree';
import { PrototypeExamDetailsComponent } from '../modals/prototype-exam-details/prototype-exam-details.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatiereService } from '../services/matiere.service';
import { Matiere } from '../models/Matiere';

@Component({
  selector: 'app-exams-theme',
  templateUrl: './exams-theme.component.html',
  styleUrls: ['./exams-theme.component.css']
})
export class ExamsThemeComponent {
  themeId: any = 1
  matiereId:any
  files!: TreeNode[];
  matiere:Matiere
  
  selectedFiles!: any;

  videoUrl:any
  videoid :any ;

  ExamenList : Examen[]

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.matiereId = params.get('matiereid') || null;  
  
    });


    if (this.matiereId !== null) {
      this.fetchMatiereById(this.matiereId);
      this.fetchGetExamensByMatiere();
  
    }
  }





  constructor(
    private examenService:ExamenService ,
    private dialogService:DialogService,
    private route:ActivatedRoute,
    private matiereService:MatiereService
    )
  {

  }

  /*****************************************************************************************************/
  fetchGetExamensByMatiere(){
    this.examenService.GetExamensMatiere(this.matiereId).subscribe(

      (data)=>{
        this.ExamenList = data
        this.files = this.mapExamsToTreeNodes(data);
      },
      (error)=>{
        console.log(error)
      }
      )
  }
// Add this method to your ExamenComponent


// Modify mapExamsToTreeNodes method
mapExamsToTreeNodes(examens: Examen[]): TreeNode<any>[] {
  return examens.map((examen, index) => {
    // Check if prototypeExams is available
    const sortedPrototypeExams = examen.prototypeExams
      ? examen.prototypeExams.slice().sort((a, b) => {
          const numA = parseFloat(a.nomPrototypeExam);
          const numB = parseFloat(b.nomPrototypeExam);
          return numA - numB;
        })
      : [];

    const childrenNodes: TreeNode<any>[] = sortedPrototypeExams.map((prototypeExam, i) => ({
      key: `${index}-${i}`,
      label: "نموذج " + prototypeExam.nomPrototypeExam,
      data: {
        prototypeExam,
        nomExamen: examen.nomExamen,
        idExamen: examen.id, // Include nomExamen in data
      },
    }));

    return {
      key: `${index}`,
      label: examen.nomExamen,
      children: childrenNodes,
      data: {
        ...examen,
      },
    };
  });
}

onNodeSelect(event: TreeNodeSelectEvent): void {
  const prototypeExamId: number | undefined = event.node.data?.prototypeExam?.id;
  const nomExamen: string | undefined = event.node.data?.nomExamen;
  const idExamen: number | undefined = event.node.data?.idExamen;

  if (prototypeExamId !== undefined && nomExamen !== undefined && idExamen !== undefined  ) {
    this.OpenPrototypeExamDetailsComponent(prototypeExamId, nomExamen,idExamen);
  }
}

fetchMatiereById(idMatiere:number){

  this.matiereService.getMatiereById(idMatiere).subscribe(
    (data)=>
    this.matiere = data
    ,(error)=>console.log(error)
  )
}




/*****************************************************************************************************/

public OpenPrototypeExamDetailsComponent(prototypeExamId: number,nomExamen:string,idExamen:number): void {
  this.dialogService.open(PrototypeExamDetailsComponent, {
    showHeader: false, 
    width: '60%',
    height: '80%',
    dismissableMask: true,
    data: {
      prototypeExamId: prototypeExamId,
      nomExamen:nomExamen,
      idExamen:idExamen
    },
  });
}

/*****************************************************************************************************/

}
