
  <template>

    <v-content>
      <v-card style="margin-top: 40px;">
        <v-card-title>
          <h3>Архив тендеров</h3>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="displayArchivedTenders"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.area }}</td>
            <td class="text-xs-left">{{ props.item.uploadDate }}</td>
            <td class="text-xs-left">{{ props.item.expirationDate }}</td>
            <td class="text-xs-left">{{ props.item.price }}</td>
          </template>

          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Такой тендер не найден
          </v-alert>
        </v-data-table>
      </v-card>


    </v-content>

  </template>

  <script>

    export default {
      data(){
        return {
          selectedTender: '',
          tenderInfo: false,

          //==================================
          // Данные для таблицы - тендеры
          //==================================

          search: '',
          headers: [
            {
              text: 'Название',
              align: 'left',
              sortable: false,
              value: 'name'
            },
            { text: 'Площадка', value: 'area' },
            { text: 'Дата добавления', value: 'uploadDate' },
            { text: 'Дата окончания', value: 'expirationDate' },
            { text: 'Цена', value: 'price' }
          ],

        }
      },
      computed: {
        displayUploadDate(){
          if(!!this.selectedTender){
            let date = this.selectedTender.uploadDate;
            let dd = date.getDate();
            let mm = date.getMonth()+1;
            let yy = date.getFullYear();

            if(dd < 10) {
              dd = '0'+ dd
            }

            if(mm < 10) {
              mm = '0'+ mm
            }
            return date = mm + '/' + dd + '/' + yy;

          }

        },
        displayArchivedTenders(){
          return this.$store.getters.getArchivedTenders
        }

      }


    }
  </script>

