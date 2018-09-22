<template>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="getProcessedTenders"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
            <span>
          {{ props.header.text }}
        </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-right" @click = "showTender(props.item)">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.area }}</td>
          <td class="text-xs-right">{{ props.item.uploadDate }}</td>
          <td class="text-xs-right">{{ props.item.expirationDate }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
        </template>

      </v-data-table>

      <v-layout row justify-center>
        <v-dialog v-model="showProcessedTender" persistent max-width="290">
          <v-card>

           <p><span>Ссылка:</span> {{ selectedTender.name }}</p>
            <p><span>Дата начала обработки</span>: {{ selectedTender.uploadDate }}</p>
            <span>Прикрепить файлы</span>
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <img :src="imageUrl" height="150" v-if="imageUrl"/>
              <v-text-field label="Загрузить файл" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-flex>


            <p>Товарные позиции:</p>
            <v-combobox
              v-model="model"
              :filter="filter"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search"
              hide-selected
              label="Введите наименование товара"
              multiple
              small-chips
              solo
            >
              <template slot="no-data">
                <v-list-tile>
                  <span class="subheading">Создать</span>
                  <v-chip
                    label
                    small
                  >
                    {{ search }}
                  </v-chip>
                </v-list-tile>
              </template>
              <template
                v-if="item === Object(item)"
                slot="selection"
                slot-scope="{ item, parent, selected }"
              >
                <v-chip

                  :selected="selected"
                  label
                  small
                >
        <span class="pr-2">
          {{ item.text }}
        </span>
                  <v-icon
                    small
                    @click="parent.selectItem(item)"
                  >close</v-icon>
                </v-chip>
              </template>
              <template
                slot="item"
                slot-scope="{ index, item, parent }"
              >
                <v-list-tile-content>
                  <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    flat
                    background-color="transparent"
                    hide-details
                    solo
                    @keyup.enter="edit(index, item)"
                  ></v-text-field>
                  <v-chip
                    v-else
                    dark
                    label
                    small
                  >
                    {{ item.text }}
                  </v-chip>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                <v-list-tile-action @click.stop>
                  <v-btn
                    icon
                    @click.stop.prevent="edit(index, item)"
                  >
                    <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
                  </v-btn>
                </v-list-tile-action>


              </template>
            </v-combobox>


            <!--  Окно с найденными соответствиями товаров с базы с введенными товарами  -->
            <v-layout row justify-center>
              <v-dialog v-model="showMatchesWithProductDatabase" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Тендер 1</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm3 md3>
                          <h4>Товар 1</h4>
                        </v-flex>
                        <v-flex xs12 sm9 md9>

                          <v-select
                            :items="itemsFound"
                            v-model="itemsFoundValue"
                            menu-props="auto"
                            label="Найденные позиции"
                            multiple
                          >
                            <template
                              slot="selection"
                              slot-scope="{ item, index }"
                            >
                              <v-chip v-if="index === 0">
                                <span>{{ item }}</span>
                              </v-chip>
                              <span
                                v-if="index === 1"
                                class="grey--text caption"
                              >(+{{ itemsFoundValue.length - 1 }} найденных товаров)</span>
                            </template>
                          </v-select>


                        </v-flex>

                        <v-flex xs12 sm3 md3>
                          <h4>Товар 2</h4>
                        </v-flex>
                        <v-flex xs12 sm9 md9>
                          <v-tooltip bottom>
                            <span slot="activator">Совпадений не найдено</span>
                            <span>Можете добавить нажав на кнопку справа</span>
                          </v-tooltip>
                          <v-btn
                            fab
                            small
                            color="cyan accent-2"
                            @click="dialog = !dialog"
                          >
                            <v-icon>add</v-icon>
                          </v-btn>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="showMatchesWithProductDatabase = false">Готово</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="showProcessedTender = false">Закрыть</v-btn>
              <v-btn color="green darken-1" flat @click.native="showMatchesWithProductDatabase = true">Проверить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>


      <!--  Окно добавления синонимов товаров  -->
      <v-layout row justify-center>
        <v-dialog v-model="showModalToAddProducts" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Добавление товара</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm3 md3>
                    <h4>Наименование</h4>
                  </v-flex>
                  <v-flex xs12 sm9 md9>
                    <h3>Товар 4</h3>
                  </v-flex>

                  <v-flex xs12 sm3 md3>
                    <h4>Синонимы</h4>
                  </v-flex>
                  <v-flex xs12 sm9 md9>
                    
                  </v-flex>

                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="showMatchesWithProductDatabase = false">Готово</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

    </v-container>

</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'

  export default {
    data(){
      return {
        selectedTender: '',
        showProcessedTender: false,
        search: '',
        headers: [
          {
            text: 'Наименование',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Электронная площадка', value: 'area' },
          { text: 'Дата начала приёма заявок', value: 'uploadDate' },
          { text: 'Дата окончания приёма заявок', value: 'expirationDate' },
          { text: 'Начальная цена', value: 'price' }
        ],
        imageName: '',
        imageUrl: '',
        imageFile: '',

        activator: null,
        attach: null,
        editing: null,
        index: -1,
        items: [
          { header: 'Введите наименование товара' },
        ],
        nonce: 1,
        menu: false,
        model: [

        ],
        x: 0,
        searchItem: null,
        y: 0,

        showMatchesWithProductDatabase: false,
        itemsFound: ['Товар1', 'Товар2', 'Товар3', 'Товар4', 'Товар5', 'Товар6'],
        itemsFoundValue: ['Товар1', 'Товар2', 'Товар3', 'Товар4']

      }
    },

    computed: {
      ...mapGetters([
        'getProcessedTenders'
      ])
    },


    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
            /*  color: this.colors[this.nonce - 1]*/
            }

            this.items.push(v)

            this.nonce++
          }


          return v
        })
      }
    },


    methods: {
      showTender(tender){
        this.selectedTender = tender;
        this.showProcessedTender = true;
      },
      pickFile () {
        this.$refs.image.click ()
      },
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      },

      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }

    }
  }
</script>
