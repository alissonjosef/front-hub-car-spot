import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[appDragDropFile]',
    standalone: true
})
export class DragDropFileDirective {
    @Output() fileDropped = new EventEmitter<any>();

    @HostListener('dragover', ['$event']) onDragOver(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.removeClass(evt.target, 'border-dashed');
        this.removeClass(evt.target, 'border-solid');
        this.addClass(evt.target, 'border-dashed');
    }

    @HostListener('dragleave', ['$event']) onDragLeave(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.removeClass(evt.target, 'border-dashed');
        this.removeClass(evt.target, 'border-solid');
        this.addClass(evt.target, 'border-solid');
    }

    @HostListener('drop', ['$event']) onDrop(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.removeClass(evt.target, 'border-dashed');
        this.removeClass(evt.target, 'border-solid');
        this.addClass(evt.target, 'border-solid');
        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files);
        }
    }

    private addClass(el: Element, className: string) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    }

    private removeClass(el: Element, className: string) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
}
