import { Component } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  constructor(private audio: AudioService){}

  private filters = [
    {
      name: "lowshelf",
      checked: false,
    },
    {
      name: "highshelf",
      checked: false
    }
  ];

  get selectedFilters() {
    return this.filters.filter(flt => flt.checked).map(flt => flt.name)
  }

  onChange() {
    console.log("selectedFilter: ", this.selectedFilters);
    this.audio.connectFilters(this.selectedFilters);
  };
}
