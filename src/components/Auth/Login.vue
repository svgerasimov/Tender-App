<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Форма входа</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        prepend-icon="person"
                        name="email"
                        label="Email"
                        type="email"
                        :rules="emailRules"
                        v-model="email"
                        required
                      ></v-text-field>

                      <v-text-field
                        prepend-icon="lock"
                        name="password"
                        label="Пароль"
                        id="password"
                        type="password"
                        :rules="passwordRules"
                        v-model="password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
              
                    <v-btn
                      color="primary"
                      @click="onSubmit"
                      :disabled="!valid"
                    >Войти</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>



    </v-container>
  </v-content>
</template>

<script>


  export default {
    name: 'Login',
    data () {
      return {
          email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'Введите Ваш E-mail',
          v => /.+@.+/.test(v) || 'Введите корректный E-mail '
        ],
        passwordRules: [
          v => !!v || 'Введите Ваш пароль',
          v => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов'
        ]
      }
    },
        computed: {
      isAuth(){
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      onSubmit (e) {
         e.preventDefault()
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }
          console.log(user)
          this.$store.dispatch('login', {email: user.email, password: user.password}).then( res=> {
    
            if (res.data.idToken) {
              this.$router.push('/')
            }
            console.log(res)
          })

          

        } 
      }
    },


  }
</script>
