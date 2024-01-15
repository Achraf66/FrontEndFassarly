import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Examen } from 'src/app/modules/admin/adminmodules/exams/Examen';
import { ExamenService } from 'src/app/modules/admin/adminmodules/exams/service/examen.service';
import { TreeNode } from 'primeng/api';
import { TreeNodeSelectEvent } from 'primeng/tree';
import { PrototypeExamDetailsComponent } from '../../modals/prototype-exam-details/prototype-exam-details.component';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit{
  @Input() matiereId: any;
  @Input() themeId: any;

  files!: TreeNode[];

  selectedFiles!: any;

  videoUrl:any
  videoid :any ;

  ExamenList : Examen[]

  ngOnInit(): void {
    if (this.matiereId !== null && this.themeId !== null) {
      this.fetchGetExamensByMatiere();
  
    }
  }





  constructor(
    private examenService:ExamenService ,
    private dialogService:DialogService
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
