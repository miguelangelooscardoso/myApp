import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit{
  imageIndex: number = 1;
  item !: Item;
  feedbackControl = new FormControl('');
  showError = false;
  feedbackSaved = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
    ) {
  }
  ngOnInit(): void{
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getItem(id).subscribe((res: any) => {
        this.item = res;
      });
    });
  }

  submitFeedback(){
    let feedback = this.feedbackControl.value;

    if(feedback === '' || feedback === null){
      this.showError = true;
      return;
    }

    let userid = this.utilityService.getUser().id;
    let itemid = this.item.id;

    this.navigationService
      .submitFeedback(userid, itemid, feedback)
      .subscribe((res) => {
        this.feedbackSaved = true;
        this.feedbackControl.setValue('');
      });
  }

}
