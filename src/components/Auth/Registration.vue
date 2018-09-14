<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Форма регистрации</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      prepend-icon="person"
                      name="name"
                      label="Имя"
                      type="text"
                      :rules="nameRules"
                      v-model="name"
                      required
                    ></v-text-field>

                    <v-text-field
                      prepend-icon="person"
                      name="secondName"
                      label="Фамилия"
                      type="text"
                      :rules="secondNameRules"
                      v-model="secondName"
                      required
                    ></v-text-field>

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

                    <v-text-field
                      prepend-icon="lock"
                      name="confirm-password"
                      label="Подтвердите пароль"
                      id="confirm-password"
                      type="password"
                      :rules="confirmPasswordRules"
                      v-model="confirmPassword"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="onSubmit"
                    :disabled="!valid"
                  >Создать аккаунт</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {

        name: '',
        secondName: '',
        email: '',
        password: '',
        valid: false,
        confirmPassword: '',
        emailRules: [
          v => !!v || 'Введите Ваш E-mail',
          v => /.+@.+/.test(v) || 'Введите корректный E-mail '
        ],
        passwordRules: [
          v => !!v || 'Введите Ваш пароль',
          v => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов'
        ],
        nameRules: [
          v => !!v || 'Введите Ваше Имя'
        ],
        secondNameRules: [
          v => !!v || 'Введите Вашу Фамилию'
        ],
        confirmPasswordRules: [
          v => !!v || 'Введите Ваш пароль',
          v => v === this.password || 'Пароль не совпадает с введенным выше'
        ]



      }
    },
    methods: {
      onSubmit(){
        // logic here
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password,
            name: this.name,
            secondName: this.secondName,
          }
          console.log(user)
        }
      }
    }
  }
</script>
