import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, ViewChild, OnChanges, OnInit } from '@angular/core';
//import 'tinymce';
declare const tinymce:any;

@Component({
  selector: 'app-tiny-mce',
  templateUrl: './tiny-mce.component.html',
  styleUrls: ['./tiny-mce.component.css']
})
export class TinyMceComponent implements OnInit, AfterViewInit, OnDestroy  {
  
  @Input() elementId: String;
  @Output() onEditorKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Input() content: string;
  editor:any;

  ngOnDestroy(): void {
    tinymce.remove(this.editor);
  }

  ngAfterViewInit(): void {
    tinymce.baseURL = "/assets/tinymce";
    tinymce.init({
      selector: '#' + this.elementId,
      height: 500,
      menubar: false,
      //language: 'vi_VN',
      //skin_url: '/assets/tinymce/tinymce-custom-skin/custom',
      //language_url: '/assets/tinymce/langs/vi_VN.js',
      paste_data_images: true,
      fontsize_formats: '8pt 10pt 12pt 13pt 14pt 15pt 18pt 24pt 36pt',
      plugins: "autoresize autosave autolink code codesample colorpicker emoticons fullscreen hr image code imagetools media preview table textcolor wordcount",
      toolbar: "imageupload  forecolor cut copy paste fontselect  fontsizeselect italic bold link preview code image ", 
      autoresize_bottom_margin: 5,
      autoresize_min_height: 100,    
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('init', () => {
          editor.setContent(this.content,{format : 'raw'});
        });
      }, 
           
    })
  }

  constructor() { }

  ngOnInit() {
  }

}
