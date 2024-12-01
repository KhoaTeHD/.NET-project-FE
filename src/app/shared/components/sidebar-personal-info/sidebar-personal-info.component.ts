import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareUserDtoService } from '../../../core/services/shared/data/share_userDto.service';
import { TokenStorageService } from '../../../core/services/auth/token-storage.service';
import { UserDto } from '../../../core/models/auth/user-dto.model';

@Component({
  selector: 'app-sidebar-personal-info',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-personal-info.component.html',
  styleUrl: './sidebar-personal-info.component.css'
})
export class SidebarPersonalInfoComponent {
  userDto: UserDto | null = null;
  avatarUrl: string | null = null;
  fullname: string | null = null;

  constructor(
    private shareUserDtoService: ShareUserDtoService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    const storedUser = this.tokenStorageService.getUser();
    if (storedUser) {
      this.userDto = storedUser;
      this.avatarUrl = this.userDto!.avatarUrl;
      this.fullname = this.userDto!.name;
    }
  
    this.shareUserDtoService.user$.subscribe((user) => {
      if (user) {
        this.userDto = user;
        this.avatarUrl = this.userDto.avatarUrl;
        this.fullname = this.userDto.name;
      }
    });
  }
  
}
