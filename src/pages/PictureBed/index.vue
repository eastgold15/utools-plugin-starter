<script lang="ts" setup>
import { ref, reactive } from 'vue'

defineProps({
  enterAction: {
    type: Object,
    required: true,
  },
})

interface ImageItem {
  id: string
  url: string
  name: string
  size: number
  uploadTime: string
}

const images = ref<ImageItem[]>([])
const isDragging = ref(false)
const uploading = ref(false)

// 拖拽相关事件
const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  
  const files = Array.from(e.dataTransfer?.files || [])
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  if (imageFiles.length > 0) {
    await uploadImages(imageFiles)
  }
}

// 文件选择
const fileInput = ref<HTMLInputElement>()
const selectFiles = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  if (files.length > 0) {
    await uploadImages(files)
  }
  target.value = '' // 清空input
}

// 上传图片逻辑（需要你自己实现）
const uploadImages = async (files: File[]) => {
  uploading.value = true
  
  try {
    for (const file of files) {
      // TODO: 这里需要你实现实际的上传逻辑
      // 示例：调用你的云存储API
      const uploadedUrl = await uploadToCloudStorage(file)
      
      const newImage: ImageItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        url: uploadedUrl,
        name: file.name,
        size: file.size,
        uploadTime: new Date().toLocaleString()
      }
      
      images.value.unshift(newImage)
    }
  } catch (error) {
    console.error('上传失败:', error)
    // TODO: 显示错误提示
  } finally {
    uploading.value = false
  }
}

// 云存储上传函数（需要你实现）
const uploadToCloudStorage = async (file: File): Promise<string> => {
  // TODO: 实现你的云存储上传逻辑
  // 这里只是示例，返回一个模拟的URL
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟上传，实际应该调用你的云存储API
      const mockUrl = `https://example.com/images/${Date.now()}-${file.name}`
      resolve(mockUrl)
    }, 1000)
  })
}

// 复制URL到剪贴板
const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    // TODO: 显示复制成功提示
    console.log('URL已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
  }
}

// 删除图片
const deleteImage = async (id: string) => {
  // TODO: 这里可以添加确认对话框
  const index = images.value.findIndex(img => img.id === id)
  if (index > -1) {
    // TODO: 如果需要，可以调用API删除云存储中的文件
    images.value.splice(index, 1)
  }
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<template>
  <div class="picture-bed">
    <!-- 上传区域 -->
    <div 
      class="upload-area"
      :class="{ 'dragging': isDragging, 'uploading': uploading }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="selectFiles"
    >
      <input 
        ref="fileInput"
        type="file" 
        multiple 
        accept="image/*" 
        @change="handleFileSelect"
        style="display: none;"
      >
      
      <div class="upload-content">
        <div class="upload-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
        <div class="upload-text">
          <p v-if="!uploading" class="primary-text">点击选择图片或拖拽图片到此处</p>
          <p v-else class="primary-text">上传中...</p>
          <p class="secondary-text">支持 JPG、PNG、GIF、WebP 格式</p>
        </div>
      </div>
    </div>

    <!-- 图片瀑布流 -->
    <div v-if="images.length > 0" class="images-container">
      <div class="images-grid">
        <div 
          v-for="image in images" 
          :key="image.id" 
          class="image-item"
        >
          <div class="image-wrapper">
            <img :src="image.url" :alt="image.name" class="image" />
            
            <!-- 悬停操作层 -->
            <div class="image-overlay">
              <div class="image-actions">
                <button 
                  class="action-btn copy-btn"
                  @click="copyUrl(image.url)"
                  title="复制URL"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
                <button 
                  class="action-btn delete-btn"
                  @click="deleteImage(image.id)"
                  title="删除"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 图片信息 -->
          <div class="image-info">
            <p class="image-name" :title="image.name">{{ image.name }}</p>
            <p class="image-meta">{{ formatFileSize(image.size) }} • {{ image.uploadTime }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <p>还没有上传任何图片</p>
    </div>
  </div>
</template>

<style scoped>
.picture-bed {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 上传区域 */
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
  margin-bottom: 30px;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}

.upload-area.dragging {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: scale(1.02);
}

.upload-area.uploading {
  border-color: #10b981;
  background: #f0fdf4;
  pointer-events: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.upload-icon {
  color: #6b7280;
  transition: color 0.3s ease;
}

.upload-area:hover .upload-icon {
  color: #3b82f6;
}

.upload-text .primary-text {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin: 0 0 4px 0;
}

.upload-text .secondary-text {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* 图片网格 */
.images-container {
  margin-top: 20px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.image-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.image-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.image-item:hover .image {
  transform: scale(1.05);
}

/* 悬停操作层 */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.image-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.copy-btn {
  background: #3b82f6;
}

.copy-btn:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.delete-btn {
  background: #ef4444;
}

.delete-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

/* 图片信息 */
.image-info {
  padding: 12px 16px;
}

.image-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-meta {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .picture-bed {
    padding: 16px;
  }
  
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
  
  .upload-area {
    padding: 30px 16px;
  }
}

@media (max-width: 480px) {
  .images-grid {
    grid-template-columns: 1fr;
  }
}
</style>
