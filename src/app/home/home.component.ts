import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storages/storage.service';
import { HomeService } from './home.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateUpdateContactComponent } from '../create-update-contact/create-update-contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'number', 'destroy'];
  public dataSource: any =[];
  public message: string = '';

  constructor(private homeService: HomeService, private storageService: StorageService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = [];
    let userId = Number.parseInt(this.storageService.getUserId()!);
    this.homeService.getContact(userId).subscribe((res: any) => {
      this.dataSource = res.contacts;
    });
  }

  removeContact(contactId: number) {
    let userId = Number.parseInt(this.storageService.getUserId()!);

    this.homeService.removeContact(userId, contactId).subscribe((res: any) => {
      this.dataSource = this.dataSource.filter((x: any)=> x.id != contactId);
      let cloned = [... this.dataSource]
      this.dataSource = cloned;
    });
  }

  updateContact(contactId: number, name: string, number: string) {
    let userId = Number.parseInt(this.storageService.getUserId()!);

    const dialogRef1 = this.dialog.open(CreateUpdateContactComponent, {restoreFocus: false,
      data: { name: name,  number: number}});

    dialogRef1.afterClosed().subscribe((res: any) => {
      if (res) {
        let name = res.name;
        let number = res.number;
        this.homeService.updateContact(userId, contactId, name, number).subscribe((res: any) => {
          if (res.status && res.status != 200) {
            this.message = res.error;
          } else {
            this.dataSource.filter((x: any) => x.id == res.id)[0].name = res.name;
            this.dataSource.filter((x: any) => x.id == res.id)[0].number = res.number;
            let cloned = [... this.dataSource]
            this.dataSource = cloned;
          }
        });
      }
    });
  }

  addContact() {
    this.message = '';
    const dialogRef = this.dialog.open(CreateUpdateContactComponent, {restoreFocus: false,
      data: { name: '',  number: ''}});

    dialogRef.afterClosed().subscribe((res: any) => {
      console.log("OVDE")
      if (res) {
        let name = res.name;
        let number = res.number;
        let userId = Number.parseInt(this.storageService.getUserId()!);
        this.homeService.addContact(userId, name, number).subscribe((res: any) => {
          console.log(res);
          if (res.status && res.status != 200) {
            this.message = res.error;
          } else {
            this.dataSource.push({
              id: res.id,
              name: res.name,
              number: res.number
            });
            let cloned = [... this.dataSource]
            this.dataSource = cloned;
          }
        });
      }
    });
  }

  logout() {
    this.storageService.removeToken();
    this.storageService.removeUserId();
    this.router.navigateByUrl('');
  }
}
