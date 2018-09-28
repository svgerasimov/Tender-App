<template>
  <v-layout row justify-center>
    <v-dialog v-model="showCreateProv" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Создать поставщика</span>
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
                {{ tender }}
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
          volume: this.volumeOfTender
         }

        this.tender.providers.push(newProvider)
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
      }
    },


  }
</script>
