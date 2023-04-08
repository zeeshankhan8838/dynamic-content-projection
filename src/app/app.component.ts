import { ContentComponent } from './content/content.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injector, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AdhostDirective } from './adhost.directive';
export type Content<T> = string | TemplateRef<T> | Type<T>;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-app';
  @ViewChild(AdhostDirective, { static: true }) adHost!: AdhostDirective;
@ViewChild('embedRef', { static: true }) emebedRef!:TemplateRef<any>;
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
    ) { }

  async ngOnInit() {
    let template=`<div><h1 class="heading-one">Content Projection Heading</h1>`

    // For template
    this.openComponent(template);
    // For Component
    this.openComponent(ContentComponent);


  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.openComponent(this.emebedRef);
  }

  openComponent<T>(content: Content<T>) {

    const ngContent = this.resolveNgContent(content);
    let options= {
      injector: this.injector,
      projectableNodes:ngContent
  }
    const factory = this.adHost.viewContainerRef.createComponent(DynamicComponentComponent,options);
    factory.hostView.detectChanges();
  }

  resolveNgContent<T>(content: Content<T>) {
    if (typeof content === 'string') {
      const element = this.document.createElement('div');
      element.innerHTML=content;
      return [[element]];
    }
    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(content.elementRef.nativeElement);
      return [viewRef.rootNodes];
    }

    if(typeof(content)==='function'){
    const factory = this.adHost.viewContainerRef.createComponent(content);
    return [[factory.location.nativeElement]];
    }

    return[[]]

  }




}
