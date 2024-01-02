import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../Models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl :any
  constructor(private http: HttpClient) {
    this.baseUrl = environment.fassarlyBaseUrl
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/api/messages`);
  }

  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/api/messages/${id}`);
  }

  saveMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/api/messages/`, message);
  }

  updateMessage(id: number, message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/api/messages/${id}`, message);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/messages/${id}`);
  }
}
