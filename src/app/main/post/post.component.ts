import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemConstant } from 'src/app/core/common/system.constant';
import { DataService } from 'src/app/core/service/data.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/core/service/upload.service';
import { UtilityService } from 'src/app/core/service/utility.service';
import { AuthenService } from 'src/app/core/service/authen.service';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { MessageConstant } from 'src/app/core/common/message.constant';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public baseFolder: string = SystemConstant.BASE_API;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 7;
  public posts: any[] = [];
  public filter: string = '';
  public entity: any;

  @ViewChild('addEditModal', { static: false }) private addEditModal: ModalDirective;
  @ViewChild('image', { static: false }) private image;


  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _router: Router, private _uploadService: UploadService, private _utilityService: UtilityService, public _authenService: AuthenService) { }

  ngOnInit() {
    this.search();
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }

  public createAlias(name: any) {
    this.entity.SeoAlias = this._utilityService.MakeSeoTitle(name);
  }

  public showAdd() {
    this.entity = { Status: false };
    this.addEditModal.show();

  }

  showEdit(id: string) {
    this._dataService.get('/api/post/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.addEditModal.show();
    });
  }

  public search() {
    this._dataService.get('/api/post/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter)
      .subscribe((res: any) => {
        if (res != undefined) {
          this.posts = res.Items;
          this.pageIndex = res.PageIndex;
          this.totalRow = res.TotalRows;
        }
      });
  }

  public searchIndex() {
    this.pageIndex = 1;
    this.search();
  }

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/post/delete', 'id', id).subscribe((res: any) => {
      if (res != undefined) this.search();
    });
  }

  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id));
  }

  public navigateToUpdate(id: string) {
    this._router.navigate(['/main/post-add/index', id]);
  }


  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this.entity.Status = 0;
      this._dataService.post("/api/post/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        if (res != undefined) {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.image.nativeElement.value = '';
          this.navigateToUpdate(res.Id);
        }
      })
    }
    else {
      this._dataService.put("/api/post/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        if (res != undefined) {
          this.search();
          this.addEditModal.hide();
          form.resetForm();
          this.image.nativeElement.value = '';
        }
      })
    }
  }

  saveChange(form: NgForm) {
    if (form.valid) {
      let fi = this.image.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile("/api/upload/saveImage?type=post", null, fi.files)
          .then((imageUrl: any) => {
            this.entity.Image = imageUrl.path;
          }).then(() => {
            this.saveData(form);
          });
      }
      else {
        this.saveData(form);
      }
    }
  }


}
