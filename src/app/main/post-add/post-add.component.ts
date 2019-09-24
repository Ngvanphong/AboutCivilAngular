import { Component, OnInit ,ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SystemConstant } from 'src/app/core/common/system.constant';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UploadService } from 'src/app/core/service/upload.service';
import { MessageConstant } from 'src/app/core/common/message.constant';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit  {

  public baseFolder: string = SystemConstant.BASE_API;
  @ViewChild('imageManageModal',{static:false}) private imageManageModal: ModalDirective;
  public entity: any = { Content: '' };
  public posts: any[];
  public postCategories: any[]
  public blogId: Observable<string>

  @ViewChild('imagePath',{static:false}) private imagePath;
  public imageEntity: any = {};
  public postImages: any[];
  public image: any = {};
  public parama: any;
  public editorConfig:any;
  constructor(private _dataService: DataService, private _activateRouter: ActivatedRoute, private _router: Router,
    private _notificationService: NotificationService, private _uploadService: UploadService) { 
      this._activateRouter.params.subscribe(params => {
        this.blogId = params['id'];
        this.imageEntity.BlogId=this.blogId;
      })
    }
  
  ngOnInit() {
    this.getDetail();
  }

  private getDetail() {
    this._dataService.get('/api/post/detail/' + this.blogId).subscribe((response: any) => {
      this.entity = response;
    });
  }

  goBack() {
    this._notificationService.printConfirmationDialog("Bạn đã lưu nội dung trước khi quay lại !", () => {
      this._router.navigate(['/main/post/index']);
      
    })
  }

  public updateContent() {
    this._dataService.put("/api/post/update", JSON.stringify(this.entity)).subscribe((res: any) => {
    })
  }

  public showImageManage() {
    this.imageEntity.BlogId=this.blogId;
    this.loadPostImage(this.imageEntity.BlogId);
    this.imageManageModal.show();
  }

  private loadPostImage(id: number) { 
    this._dataService.get('/api/postimage/getall?blogId=' + id).subscribe((res) => {
      this.postImages = res;
    });
  }

  public closePopupImage() {
    this.imageManageModal.hide();
  }

  public deleteImage(imageId: string) {
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/postimage/delete', 'id', imageId.toString()).subscribe((res) => {
        this.imageEntity.BlogId=this.blogId;
        this.loadPostImage(this.imageEntity.BlogId);
      });
    })
  }

  public savePostImage(form: NgForm) {
    if (form.valid) {
      var fi = this.imagePath.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveimage?type=post', null, fi.files).then((imageUrl:any) => {
          this.imageEntity.Path = imageUrl.path;
        }).then(() => {
          this.changeData(form);
        })
      }
    }
  }

  private changeData(form: NgForm) {
    this.imageEntity.BlogId=this.blogId;
    this._dataService.post('/api/postimage/add', JSON.stringify(this.imageEntity)).subscribe((res) => {
      this.imagePath.nativeElement.value = '';
      this.imageEntity.Caption = '';
      this.loadPostImage(this.imageEntity.BlogId);
      form.resetForm();
    })
  }


}
