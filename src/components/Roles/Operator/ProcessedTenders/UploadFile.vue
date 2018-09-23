<template>
  <div>
    <h4>Прикрепить файлы: </h4>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <img :src="fileUrl" height="100" v-if="fileUrl"/>
      <v-text-field label="Прикрепить файл" @click='pickFile' v-model='fileName' prepend-icon='attach_file'></v-text-field>
      <input
        type="file"
        style="display: none"
        ref="inputFile"
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        @change="onFilePicked"
      >
    </v-flex>
    <v-dialog v-model="showUploadWindow" max-width="290">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="showUploadWindow = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        title: "Прикрепить файл",
        showUploadWindow: false,
        fileName: '',
        fileUrl: '',
        docFile: ''
      }
    },

    methods: {
      pickFile () {
        this.$refs.inputFile.click ()
      },

      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.fileName = files[0].name
          if(this.fileName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.fileUrl = fr.result
            this.docFile = files[0] // this is a document file that can be sent to server...
          })
        } else {
          this.fileName = ''
          this.docFile = ''
          this.fileUrl = ''
        }
      }
    }

  }
</script>
