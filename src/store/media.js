import _ from 'lodash'
import { defineStore, acceptHMRUpdate } from 'pinia'
import * as mediaAPI from '@/api/media'

export const useMediaStore = defineStore({
    id: 'media',

    state: () => ({
      files: [],
      folders: [],
      resources: [],
      path: ''
    }),

    actions: {
      async getObjects(data) {
        const response = await mediaAPI.getObjects(data)
        this.files = response.data.files
        this.folders = response.data.folders
        this.resources = _.concat(this.folders, this.files)
      },

      async newFolder(data) {
        const response = await mediaAPI.newFolder(data)
        const newFolder = response.data.newFolder
        if (!this.folders.includes(newFolder.Key)) {
          this.folders.push(newFolder.Key)
        }
        this.resources = _.concat(this.folders, this.files)
      },

      async getObject(data) {
        const response = await mediaAPI.getObject(data)
        return response.data.object
      },

      async uploadObject(data, handleUploadProgress, cancelUpload) {
        const response = await mediaAPI.uploadObject(data, handleUploadProgress, cancelUpload)
        return response.data
      },

      async deleteObject(data) {
        await mediaAPI.deleteObject(data)
      }
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMediaStore, import.meta.hot))
}
