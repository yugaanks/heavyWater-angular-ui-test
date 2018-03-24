import { ChangeDetectionStrategy, Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { Application } from 'app/shared/data/application.model';
import {AnonymousSubscription} from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Rx';
import {merge} from 'rxjs/observable/merge';
import {of} from 'rxjs/observable/of';
import {mergeMap, map}from'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnChanges {
  private items: any;
  private sub: any;
  private selectedItem: any;
  private selectedItemId: string;
  private timerSubscription: AnonymousSubscription;
  private searchTerm: string;
  constructor(private router: Router, private route: ActivatedRoute, private data: DataService) {
      this.router.events.subscribe(ev => {
        this.sub = this.route.queryParams.subscribe(params => {
          let {order} = params;
          if(order && order != this.selectedItemId) {
            this.selectedItemId = order;
            this.loadItemDetails(this.selectedItemId);
          } else {
            this.selectedItemId = undefined;
            this.selectedItem = undefined;
          }
        });
      this.sub.unsubscribe();
    });
      this.searchTerm=undefined;
   this.items = this.data.fetchApplicationsList();

   //subscribers, for search term and add new orders
   this.data.getSearchTerm$.subscribe((st) => {
                this.searchTerm = st; 
            }
        );
   this.data.ad$.subscribe(((ev)=> {
                 console.log(ev);
                 console.log(this.data.fetchApplicationsDetails(ev));
                 try {
                  let x=this.data.fetchApplicationsDetails(ev);
                  this.items=x.mergeMap(latest => {
                    const fullResult$ = this.items.map(featured => [latest,...featured]);
                    return merge(of([latest], fullResult$));
                  });
                 }
                 catch(err) {
                    console.log(err);
                 }
                 finally {
                   this.items=this.data.fetchApplicationsList();
                 }
                  
             }));
  }
   
  loadItemDetails(id) {
    this.selectedItem = this.data.fetchApplicationsDetails(id).map(data => {
      return {
        ...data,
        ORDER_ID: id,
      };
    }).share();
    console.log(this.selectedItem);
  }

  ngOnInit() {
  }
  // whenever any changes are made at back-end, this method will probably fire (not sure)
  ngOnChanges(changes: SimpleChanges) {
    this.items=this.data.fetchApplicationsList();
  }
}


