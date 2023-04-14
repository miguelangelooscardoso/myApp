import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback';
import { Item } from 'src/app/models/item';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  imageIndex: number = 1;
  item !: Item;
  feedbackControl = new FormControl('');
  showError = false;
  feedbackSaved = false;
  otherFeedbacks: Feedback[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getItem(id).subscribe((res: any) => {
        this.item = res;
        console.log('Item:', this.item); // Log the Item object
        this.fetchAllFeedbacks();
      });
    });
  }

  submitFeedback() {
    let feedback = this.feedbackControl.value;

    if (feedback === '' || feedback === null) {
      this.showError = true;
      return;
    }

    let userid = this.utilityService.getUser().id;
    let itemid = this.item.id;

    this.navigationService
      .submitFeedback(userid, itemid, feedback)
      .subscribe(
        (res) => {
          console.log('Submit Feedback Result:', res); // Log the result
          this.feedbackSaved = true;
          this.fetchAllFeedbacks();
          this.feedbackControl.setValue('');
        },
        (error) => {
          console.error('Submit Feedback Error:', error); // Log the error
        }
      );
  }

  fetchAllFeedbacks() {
    this.otherFeedbacks = [];
    this.navigationService
      .getAllFeedbacksOfItem(this.item.id)
      .subscribe(
        (res: any) => {
          console.log('Fetch All Feedbacks Result:', res); // Log the result
          for (let feedback of res) {
            this.otherFeedbacks.push(feedback);
          }
        },
        (error) => {
          console.error('Fetch All Feedbacks Error:', error); // Log the error
        }
      );
  }

  isImageAvailable(itemId: number, imageIndex: number): boolean {
    const imageName = `${itemId}/${imageIndex}.jpeg`;
    const image = new Image();
    image.src = `../../assets/Items/${imageName}`;
    return image.width > 0 && image.height > 0;
  }
  
}