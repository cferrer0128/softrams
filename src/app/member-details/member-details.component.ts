import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Imember }  from '../model/imember';

// This interface may be useful in the times ahead...

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Imember;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  id:any;

  constructor(private fb: FormBuilder, 
    private appService: AppService, 
    private router: Router, private route:ActivatedRoute) {}

  ngOnInit() {
   

    if(!this.appService.username)   this.router.navigateByUrl('/login');
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
    this.id =  this.route.snapshot.params["id"]
      //new 
      
      if(this.route.snapshot.params["id"]) {
        console.log('Param is ready ', this.id);
        this.appService.getMembersByid(this.id).subscribe(member => {
          this.memberModel = {
            id:member.id,
            firstName:member.firstName,
            lastName:member.lastName,
            jobTitle:member.jobTitle,
            team:member.team,
            status:member.status

          };
       
           
  
        });
  
      }
      
  
  }

  ngOnChanges() {}

  delete(){
    if(this.id)
      this.appService.deleteMember(this.id).subscribe(team => {
        if(team){
          console.log('member Deleted!');
          this.router.navigateByUrl('/members');
        }
  
      })
  }

  async getmax(){
    let results = await this.appService.getMembers().toPromise()
    return results;
  }
  // TODO: Add member to members
  onSubmit(form: FormGroup) {

    

    this.memberModel = {
      id:this.id,
      firstName:form.controls.firstName.value,
      lastName:form.controls.lastName.value,
      jobTitle:form.controls.jobTitle.value,
      status:form.controls.status.value,
      team:form.controls.team.value
    } as any;
    
    if(this.id && this.id !="0")

      this.appService.editMember(this.memberModel).subscribe(team => {
          this.router.navigateByUrl('/members'); })
    else 
      this.getmax().then(res => {
        this.memberModel.id = res.length+1;
        this.appService.addMember(this.memberModel).subscribe(newteam => {
          this.router.navigateByUrl('/members');})

      });
      
  }
}
