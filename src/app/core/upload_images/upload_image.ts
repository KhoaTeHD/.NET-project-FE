import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudName = 'dt46dvdeu'; // Thay bằng cloud name của bạn
  private uploadPreset = 'avatar_upload_present'; // Thay bằng upload preset đã tạo trong Cloudinary

  /**
   * Upload ảnh lên Cloudinary
   * @param file - File cần upload
   * @param folder - Thư mục trong Cloudinary (nếu cần)
   * @returns Promise với thông tin ảnh đã upload
   */
  async uploadImage(file: File, folder: string, public_id: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    
    if (folder) {
      formData.append('folder', folder);
    }

    if (public_id) {
      formData.append('public_id', public_id);
    }

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || 'Upload failed');
      }
      return result;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  /**
   * Tạo URL tối ưu cho ảnh
   * @param publicId - Tên định danh của ảnh
   * @param options - Các tùy chọn tối ưu hóa ảnh
   * @returns URL của ảnh đã được tối ưu
   */
  getOptimizedImageUrl(publicId: string, options: { width?: number; height?: number } = {}): string {
    const transformations = [
      options.width ? `w_${options.width}` : '',
      options.height ? `h_${options.height}` : '',
      'c_fill',
      'q_auto',
      'f_auto',
    ]
      .filter(Boolean)
      .join(',');

    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformations}/${publicId}`;
  }
}
