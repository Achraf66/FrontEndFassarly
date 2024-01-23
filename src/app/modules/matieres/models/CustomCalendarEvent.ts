import { CalendarEvent } from "angular-calendar";

export interface CustomCalendarEvent extends CalendarEvent {
    lienzoom?: string,
    heuredebut?:string,
    heurefin?:string
    liveSessionId?:any
  }