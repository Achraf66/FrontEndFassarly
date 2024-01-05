import { Component, Input, OnInit } from '@angular/core';
import { CalendarView, DateAdapter } from 'angular-calendar';
import { DialogService } from 'primeng/dynamicdialog';
import { SeanceEnLigne } from 'src/app/modules/admin/adminmodules/livesessions/models/SeanceEnLigne';
import { LivesessionService } from 'src/app/modules/admin/adminmodules/livesessions/services/livesession.service';
import { CustomCalendarEvent } from '../../models/CustomCalendarEvent';
import { EventdetailsmodalComponent } from '../../modals/eventdetailsmodal/eventdetailsmodal.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent  implements OnInit{

  
  @Input() matiereId: any;
  LiveSessions: SeanceEnLigne[] = [];
  events: CustomCalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;

  constructor(private sessionService: LivesessionService
    ,private dateAdapter: DateAdapter
    ,private dialogService:DialogService) {
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  

  ngOnInit(): void {
    if (this.matiereId !== null ){
      this.fetchSeancesEnligneByMatiere();
      console.log("matiereId",this.matiereId)

    }
  }
  onPreviousMonth(): void {
    this.viewDate = this.dateAdapter.addMonths(this.viewDate, -1);
    this.fetchSeancesEnligneByMatiere(); // Refresh events for the new month
  }

  onNextMonth(): void {
    this.viewDate = this.dateAdapter.addMonths(this.viewDate, 1);
    this.fetchSeancesEnligneByMatiere(); // Refresh events for the new month
  }

  fetchSeancesEnligneByMatiere() {
    this.sessionService.getSessionLiveByMatiereId(this.matiereId).subscribe(
      (data) => {
        this.LiveSessions = data;
        this.events = this.LiveSessions.map(session => {
          if (session.date !== null) {
            const lienzoom = `${session.lienZoom}`;
            const heuredebut = `${session.heureDebut}`;
            const heurefin = `${session.heureFin}`;

            return {
              title: session.titre,
              start: new Date(session.date),
              end: new Date(session.date),
              color: { primary: '#e3bc08', secondary: '#FDF1BA' },
              lienzoom: lienzoom,
              heuredebut:heuredebut,
              heurefin:heurefin
            };
          }
          return null; // or handle the case when session.date is null
        }).filter(event => event !== null) as CustomCalendarEvent[];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  dayClicked({ date, events }: { date: Date; events: CustomCalendarEvent[] }): void {
    if (this.isSameMonth(date, this.viewDate)) {
      if (this.isSameDay(this.viewDate, date) && events.length > 0) {

  
        // If you want to toggle the active day open/close, uncomment the following line
        this.activeDayIsOpen = !this.activeDayIsOpen;
      } else {
        this.activeDayIsOpen = false;
      }
  
      this.viewDate = date;
    }
  }
  
  eventClicked(clickedEvent: CustomCalendarEvent): void {
      this.OpenEventdetailsmodalComponent(clickedEvent)
  }
  
  
  public OpenEventdetailsmodalComponent(event: CustomCalendarEvent): void {
    this.dialogService.open(EventdetailsmodalComponent, {
      showHeader: false, 
      width: '30%',
      height: '40%',
      dismissableMask: true,
    
       data: {
        titleevent: event.title,
        lienzoom: event.lienzoom,    
        heuredebut: event.heuredebut,    
        heurefin: event.heurefin,    
      },
    });
  }
  
}