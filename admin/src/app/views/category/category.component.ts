import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TextColorDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { FormDirective, FormLabelDirective, FormControlDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ToastersComponent } from 'src/app/views/notifications/toasters/toasters.component'
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { Category } from 'src/app/services/category.model'
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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [HttpClientModule,
    ToastersComponent, FormDirective, FormLabelDirective, FormControlDirective, IconDirective, ReactiveFormsModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, CardHeaderComponent,
    TableDirective, NgFor, FormsModule, CommonModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective
  ],
})
export class CategoryComponent implements OnInit {
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

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Gọi API khi component khởi tạo
    this.categoryService.getCategories().subscribe(
      (response) => {
        // Kiểm tra nếu 'data' trong response là mảng
        if (Array.isArray(response.data)) {
          this.categories = response.data; // Gán mảng data vào biến categorys
        } else {
          console.error('Data is not an array', response);
          this.categories = []; // Gán mảng rỗng nếu không phải mảng
        }
      },
      (error) => {
        console.error('Error fetching categorys:', error); // Xử lý lỗi nếu có
        this.categories = []; // Gán mảng rỗng trong trường hợp có lỗi
      }
    );
  }

  exportToExcel(): void {
    console.log('Exporting to Excel...');
    const worksheet = XLSX.utils.json_to_sheet(this.filteredCategories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');

    XLSX.writeFile(workbook, 'categories.xlsx');
    console.log('File export completed');
    this.liveExportVisible = false;
  }

  get filteredCategories(): Category[] {
    if (!this.searchQuery) return this.categories;
    const query = this.searchQuery.toLowerCase();
    return this.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }

  newCategory = {
    name: '',
    description: '',
    imageUrl: 'https://t4.ftcdn.net/jpg/00/81/38/59/360_F_81385977_wNaDMtgrIj5uU5QEQLcC9UNzkJc57xbu.jpg', // Chỉ lưu tên ảnh
    slug: 'category',
  };

  // Biến để lưu dữ liệu file đã chọn
  selectedFile: File | null = null;
  // Hàm xử lý khi chọn file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Lưu tên file và tạo đường dẫn tương đối
      this.newCategory.imageUrl = 'https://t4.ftcdn.net/jpg/00/81/38/59/360_F_81385977_wNaDMtgrIj5uU5QEQLcC9UNzkJc57xbu.jpg';
    }
  }

  // Hàm thêm danh mục mới
  addNewCategory(): void {
    if (!this.newCategory.name || !this.newCategory.description || !this.newCategory.imageUrl) {
      this.toastComponent.addToastWithParams('Error', 'You must fill all of infomations', 'danger', 'top-end', true);
      return;
    }

    // Tạo dữ liệu danh mục mới
    const newCategoryData = {
      ...this.newCategory,
    };

    console.log('New Category:', newCategoryData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API
    this.categoryService.addCategory(newCategoryData).subscribe(
      (response) => {
        console.log('Category added successfully:', response);
        this.toastComponent.addToastWithParams('Success', 'You added a new category successfully!', 'success', 'top-end', true);
        // Thêm category vào danh sách hiện tại
        this.categories.push(response.data);
      },
      (error) => {
        this.toastComponent.addToastWithParams('Error', 'Error while adding a new category!', 'error', 'top-end', true);
        console.error('Error adding category:', error);
      }
    );

    // Reset form sau khi thêm
    this.newCategory = { name: '', description: '', imageUrl: '', slug: '' };
    this.selectedFile = null;
    this.closeAddModal();
  }

  onEdit() {
    if (!this.newCategory.imageUrl) {
      this.newCategory.imageUrl = this.selectedCategory?.imageUrl || '';
    }
    if (!this.newCategory.name) {
      this.newCategory.name = this.selectedCategory?.name || '';
    }
    if (!this.newCategory.description) {
      this.newCategory.description = this.selectedCategory?.description || '';
    }

    // Tạo dữ liệu danh mục mới
    const editedCategoryData = {
      //...this.originalCategory, // Giữ lại giá trị ban đầu
      ...this.newCategory, // Ghi đè các giá trị đã thay đổi
      updatedDate: new Date(),
      id: this.originalCategory?.id || 0,
    };

    console.log('Edit Category:', editedCategoryData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API
    this.categoryService.updateCategory(editedCategoryData.id, editedCategoryData).subscribe(
      (response) => {
        console.log('Category status updated successfully:', response);
        this.toastComponent.addToastWithParams('Success', `Category status updated successfully!`, 'success', 'top-end', true);

        // Cập nhật category trong danh sách hiện tại
        const index = this.categories.findIndex((cat) => cat.id === editedCategoryData.id);
        if (index !== -1) {
          this.categories[index] = {
            ...this.categories[index], // Giữ lại các thuộc tính không bị thay đổi
            ...editedCategoryData, // Ghi đè các thuộc tính vừa cập nhật
          };
        }
      },
      (error) => {
        this.toastComponent.addToastWithParams('Error', `Update category failed!`, 'error', 'top-end', true);
        console.error('Error updating category status:', error);
      }
    );

    // Reset form sau khi thêm
    this.newCategory = { name: '', description: '', imageUrl: '', slug: '' };
    this.selectedFile = null;
    this.closeEditModal();
  }


  selectedCategory: Category | null = null;
  originalCategory: Category | null = null;  // Lưu dữ liệu ban đầu
  viewModalVisible = false;
  editModalVisible = false;
  liveDeleteVisible = false;
  liveExportVisible = false;
  addModalVisible = false;

  // Modal view
  viewCategory(category: any): void {
    this.selectedCategory = category;
    this.viewModalVisible = true;
  }

  closeModal(): void {
    this.viewModalVisible = false;
    this.selectedCategory = null;
  }

  handleModalClose(event: any): void {
    this.viewModalVisible = event;
  }

  // Modal edit
  editCategory(category: any): void {
    this.selectedCategory = category;
    this.originalCategory = category;
    this.editModalVisible = true;
  }
  closeEditModal(): void {
    this.editModalVisible = false;
    this.selectedCategory = null;
  }

  handleEditModalClose(event: any): void {
    this.editModalVisible = event;
  }

  //Modal delete
  toggleLiveDelete(category: any): void {
    this.selectedCategory = category;
    this.liveDeleteVisible = !this.liveDeleteVisible;
  }
  closeDeleteModal(): void {
    this.liveDeleteVisible = false;
    this.selectedCategory = null;
  }

  handleLiveDeleteChange(event: boolean) {
    this.liveDeleteVisible = event;
  }
  onDelete(category: Category | null): void {
    if (!category) {
      console.error('No category selected for deletion');
      return;
    }
    console.log('Delete Category:', category);
    this.categoryService.deleteCategory(category.id).subscribe(
      (response) => {
        console.log('Category deleted successfully:', response);
        this.toastComponent.addToastWithParams(
          'Success',
          'You deleted this category successfully!',
          'success',
          'top-end',
          true
        );
        // Cập nhật danh sách categorys sau khi xóa
        this.categories = this.categories.filter(cat => cat.id !== category.id);
      },
      (error) => {
        this.toastComponent.addToastWithParams('Error', 'Error deleting category!', 'error', 'top-end', true);
        console.error('Error deleting category:', error);
      }
    );
    this.closeDeleteModal(); // Đóng modal sau khi xóa
  }

  //Modal export
  toggleLiveExport() {
    this.liveExportVisible = !this.liveExportVisible;
  }

  handleLiveExportChange(event: boolean) {
    this.liveExportVisible = event;
  }

  // Modal add
  addCategory(): void {
    this.addModalVisible = true;
  }
  closeAddModal(): void {
    this.addModalVisible = false;
  }

  handleAddModalClose(event: any): void {
    this.addModalVisible = event;
  }
}
