import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    if(!this.appService.username)   this.router.navigateByUrl('/login');
    this.appService.getMembers().subscribe(members => (this.members = members));
    
  }

  goToAddMemberForm() {
    console.log(`Hmmm...we didn't navigate anywhere`);
    this.router.navigate(['/members', 0]);
  }

  editMemberByID(id: number) {
    this.router.navigate(['/members', id]);
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(team => {
      if(team){
       
        this.appService.getMembers().subscribe(members => (this.members = members));
      }

    })
  }
}
