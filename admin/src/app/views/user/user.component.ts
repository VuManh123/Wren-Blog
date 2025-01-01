import { Component, OnInit, ViewChild  } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TextColorDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { FormDirective, FormLabelDirective, FormControlDirective, FormSelectDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {ToastersComponent} from 'src/app/views/notifications/toasters/toasters.component'
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {User} from 'src/app/services/user.model'
import {
  cilList,
  cilShieldAlt,
  cilPlus,
  cilVerticalAlignBottom,
  cilZoom,
  cilPencil,
  cilTrash,
} from '@coreui/icons';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [HttpClientModule,
    ToastersComponent, FormDirective, FormLabelDirective, FormControlDirective,IconDirective, ReactiveFormsModule,TextColorDirective,CardComponent,CardBodyComponent,RowComponent,ColComponent,ButtonDirective,CardHeaderComponent,
    FormSelectDirective, TableDirective,NgFor,FormsModule,CommonModule,ModalBodyComponent,ModalComponent,ModalFooterComponent,ModalHeaderComponent,ModalTitleDirective,ModalToggleDirective,ButtonCloseDirective,PopoverDirective,ThemeDirective,TooltipDirective
  ],
})
export class UserComponent implements OnInit {
  @ViewChild(ToastersComponent) toastComponent!: ToastersComponent;
  icons = {
    cilList,
    cilShieldAlt,
    cilPlus,
    cilVerticalAlignBottom,
    cilZoom,
    cilPencil,
    cilTrash,
  };
  searchQuery: string = '';

  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Gọi API khi component khởi tạo
    this.userService.getUsers().subscribe(
      (response) => {
        // Kiểm tra nếu 'data' trong response là mảng
        if (Array.isArray(response.data)) {
          this.users = response.data; // Gán mảng data vào biến users
        } else {
          console.error('Data is not an array', response);
          this.users = []; // Gán mảng rỗng nếu không phải mảng
        }
      },
      (error) => {
        console.error('Error fetching users:', error); // Xử lý lỗi nếu có
        this.users = []; // Gán mảng rỗng trong trường hợp có lỗi
      }
    );
  }

  get filteredUsers(): User[] {
    if (!this.searchQuery) return this.users;
    const query = this.searchQuery.toLowerCase();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  exportToExcel(): void {
    console.log('Exporting to Excel...');
    const worksheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    XLSX.writeFile(workbook, 'users.xlsx');
    console.log('File export completed');
    this.liveExportVisible = false;
  }

  editUser = {
    active: 0,
  };

  onEdit() {
    if (this.editUser.active === undefined || this.editUser.active === null) {
      this.editUser.active = Number(this.selectedUser?.active) || 0;
    }

    // Tạo dữ liệu danh mục mới
    const editedUserData = {
      ...this.originalUser, // Giữ lại giá trị ban đầu
      ...this.editUser, // Ghi đè các giá trị đã thay đổi
      updatedDate: new Date(),
      id: this.originalUser?.id || 0,
    };

    console.log('Edit User:', editedUserData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API
    this.userService.updateUserStatus(editedUserData.id, editedUserData.active).subscribe(
      (response) => {
        console.log('User active updated successfully:', response);
        this.toastComponent.addToastWithParams('Success',`User active updated to ${editedUserData.active} successfully!`,'success','top-end',true);
  
        // Cập nhật active trong danh sách hiện tại
        const index = this.users.findIndex((lang) => lang.id === editedUserData.id);
        if (index !== -1) {
          this.users[index].active = editedUserData.active;
        }
      },
      (error) => {
        this.toastComponent.addToastWithParams('Error',`Update user active to ${editedUserData.active} failed!`,'error','top-end',true);
        console.error('Error updating user active:', error);
      }
    );

    // Reset form sau khi thêm
    this.editUser = { active: 0,};
    this.closeEditModal();
  }

  selectedUser: User | null = null;
  originalUser: User | null = null;  // Lưu dữ liệu ban đầu
  viewModalVisible = false;
  editModalVisible = false;
  liveExportVisible = false;

  // Modal view
  viewUser(user: any): void {
    this.selectedUser = user;
    this.viewModalVisible = true;
  }

  closeModal(): void {
    this.viewModalVisible = false;
    this.selectedUser = null;
  }

  handleModalClose(event: any): void {
    this.viewModalVisible = event;
  }

  // Modal edit
  editUserModal(user: any) {
    this.selectedUser = user;
    this.originalUser = user;
    this.editModalVisible = !this.editModalVisible;
  }
  closeEditModal() {
    this.selectedUser = null;
    this.editModalVisible = !this.editModalVisible;
  }

  handleEditModalClose(event: boolean) {
    this.editModalVisible = event;
  }

  //Modal export
  toggleLiveExport() {
    this.liveExportVisible = !this.liveExportVisible;
  }

  handleLiveExportChange(event: boolean) {
    this.liveExportVisible = event;
  }
}
