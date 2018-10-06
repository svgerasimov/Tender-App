<template>
  <v-layout row justify-center>
    <v-dialog v-model="showCreateProv" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Создать поставщика</span>
          <pre>
            {{ tender }}
          </pre>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>


            <form xs12>
              <v-text-field
                v-model="publicName"
                required
                label="Публичное наименование"

              ></v-text-field>
              <v-text-field
                v-model="inn"
                label="ИНН"

              ></v-text-field>
              <v-text-field
                v-model="tel"
                label="Телефон"

              ></v-text-field>

              <v-text-field
                :error-messages="emailErrors"
                v-model="email"
                label="E-mail"
                required
              ></v-text-field>
              <v-select
                v-model="selectInfo"
                :items="infoOfTender"
                label="Знание о тендере"

              ></v-select>


                <v-select
    v-model="selectedProducts"
    :items="productsOfTender"
    label="Товары для тендера"
    multiple
  >
    <v-list-tile
      slot="prepend-item"
      ripple
      @click="toggle"
    >
     
      <v-list-tile-title>Выбрать все</v-list-tile-title>
    </v-list-tile>
    <v-divider
      slot="prepend-item"
      class="mt-2"
    ></v-divider>
    <v-divider
      slot="append-item"
      class="mb-2"
    ></v-divider>
    <v-list-tile
      slot="append-item"
      disabled
    >
      

      <v-list-tile-content v-if="takesAllProducts">
        <v-list-tile-title>Вы выбрали все товары</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-content v-else-if="takesSomeProducts">
        <v-list-tile-title>Выбрано товаров</v-list-tile-title>
        <v-list-tile-sub-title>{{ selectedProducts.length }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-content v-else>
        <v-list-tile-title>
          Выберете какие именно товары  будет поставлять данный поставщик
        </v-list-tile-title>

      </v-list-tile-content>
    </v-list-tile>
  </v-select>

              


              <v-switch
                :label="`Участвует в тендере`"
                v-model="isParticipated"
              ></v-switch>
              <v-switch
                :label="`Бронь на закупку`"
                v-model="isBooked"
              ></v-switch>

              <v-select
                v-model="selectRole"
                :items="roleToTender"
                label="Роль по отношению к товару"
              ></v-select>

              <v-text-field
                v-model="weightOfTender"
                label="Вес"
              ></v-text-field>

              <v-text-field
                v-model="priceOfTender"

                label="Цена"

              ></v-text-field>

              <v-text-field
                v-model="volumeOfTender"

                label="Объем"

              ></v-text-field>

        
              <v-btn block color="primary" dark @click.native.prevent="saveNewProv">Сохранить</v-btn>
            </form>

          </v-container>

        </v-card-text>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  export default {

    mixins: [validationMixin],

    validations: {
      publicName: { required },
      email: { required, email },
    },
    props: ['tender'],

    data(){
      return {
      selectedProducts: [],
        isParticipated: true,
        isBooked: false,
        publicName: '',
        tel: '',
        inn: '',
        email: '',
        selectInfo: null,
        selectRole: null,

        infoOfTender: [
          'info 1',
          'info 2',
          'info 3',
          'info 4'
        ],
        roleToTender: [
          'role 1',
          'role 2',
          'role 3',
          'role 4'
        ],
        weightOfTender: '',
        priceOfTender: '',
        volumeOfTender: ''
      }
    },
    computed: {
      ...mapGetters([
        'showCreateProv',
        'getNewProviders'
      ]),
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },

      productsOfTender (){
        return this.tender.products.map(product => {
          return product.name
        })
      },

      takesAllProducts () {
        return this.selectedProducts.length === this.productsOfTender.length
      },
      takesSomeProducts () {
        return this.selectedProducts.length > 0 && !this.takesAllProducts
      }
  


    },
    methods: {
      saveNewProv(){
        const newProvider = {
          name: this.publicName,
          tel: this.tel,
          inn: this.inn,
          email: this.email,
          selectInfo: this.selectInfo,
          selectRole: this.selectRole,
          weight: this.weightOfTender,
          price: this.priceOfTender,
          volume: this.volumeOfTender,
         }

   
         this.tender.products.forEach(product => {
           if(this.selectedProducts.includes(product.name)) {
            product.providers.push(newProvider)
           }
         })



        this.$v.$reset()
        this.publicName = ''
        this.tel = ''
        this.inn = ''
        this. email = ''
        this.selectInfo = null
        this.selectRole = null
        this.weightOfTender = ''
        this.priceOfTender = ''
        this.volumeOfTender = ''
       this.$store.commit('TOGGLE_CREATE_PROV_WINDOW')
      },

      toggle () {
        this.$nextTick(() => {
          if (this.takesAllProducts) {
            this.selectedProducts = []
          } else {
            this.selectedProducts = this.productsOfTender.slice()
          }
        })
      }
    }


    


  }
</script>
