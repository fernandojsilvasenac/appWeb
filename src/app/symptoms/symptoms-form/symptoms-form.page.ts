import { Component, OnInit } from '@angular/core';
import { Symptoms } from '../shared/symptoms';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomsService } from './../shared/symptoms.service';

@Component({
  selector: 'app-symptoms-form',
  templateUrl: './symptoms-form.page.html',
  styleUrls: ['./symptoms-form.page.scss'],
})
export class SymptomsFormPage implements OnInit {
  symptoms: Symptoms;
  private symptomsId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private symptomsService: SymptomsService,
              private router: Router) { }

  ngOnInit() {
    this.symptoms = new Symptoms();
  }

  async onSubmit(){
    // console.log(this.symptoms)
    this.symptomsId = this.activatedRoute.snapshot.params['id'];
    if (this.symptomsId){
      // update
    } else {
      // add
      try {
        await this.symptomsService.addSymptoms(this.symptoms);
        // mensagem OK
        this.router.navigate(['/symptoms-list']);
      } catch (error) {
        // mensagem error
        console.log(error);
      }

    }
  }

}
