import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'eventFilter'})
export class EventFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((event) =>
            event.name.toLocaleLowerCase().includes(filter) != false ) : value;
    }
}
