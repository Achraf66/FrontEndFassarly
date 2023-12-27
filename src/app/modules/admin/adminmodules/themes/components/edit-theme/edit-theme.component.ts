import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../models/Theme';
import {  MessageService } from 'primeng/api';
import { MenuService } from '../../../users/services/MenuService';
@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.css']
})
export class EditThemeComponent implements OnInit {

  Theme: Theme;
  nameTheme: string;
  idTheme: number;

  constructor(
    private menu:MenuService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private themeservice: ThemeService,
    private messageService: MessageService
  ) {
    this.idTheme = this.config.data.idTheme;
    this.fetchTheme(this.idTheme);
  }

  ngOnInit(): void {
    // Use safe navigation operator to avoid errors
    this.nameTheme = this.Theme?.nomTheme;
  }

  fetchTheme(idTheme: number): void {
    this.themeservice.getThemeById(idTheme).subscribe((theme: Theme) => {
      this.Theme = theme;
      this.nameTheme = this.Theme?.nomTheme;
    });
  }

  updateNameTheme(themename: string): void {
    this.themeservice.updateThemeNameById(this.idTheme, themename).subscribe(
      (updatedTheme: Theme) => {

        this.messageService.add({ severity: 'info', summary: 'تم تغير إسم المحور بنجاح', detail: 'تم تغير إسم المحور بنجاح' });
        this.closeModalAndNotify()
      },
      (error) => {

        this.messageService.add({ severity: 'error', summary: 'لم يتم تغير إسم المحور', detail: 'لم يتم تغير إسم المحور' });

      }
    );
  }


  closeModalAndNotify() {

    this.menu.triggerNewItemAdded()
    this.ref.close();

  }
}

