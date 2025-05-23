import { MatTableDataSource } from '@angular/material/table';

export class Table {
    selection = new Set<any>();
    dataSource = new MatTableDataSource<any>([]);

    toggleSelection(row: any): void {
        if (this.selection.has(row)) {
            this.selection.delete(row);
        } else {
            this.selection.add(row);
        }
    }

    toggleAllSelections(event: any): void {
        if (event.checked) {
            this.selection = new Set(this.dataSource.data);
        } else {
            this.selection.clear();
        }
    }

    isAllSelected(): boolean {
        return this.selection.size === this.dataSource.data.length;
    }

    isSomeSelected(): boolean {
        return this.selection.size > 0 && this.selection.size < this.dataSource.data.length;
    }
}
