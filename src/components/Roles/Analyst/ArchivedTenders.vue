
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
          :items="tenders"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left" @click="showTender(props.item)" >{{ props.item.name }}</td>
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


      <!-- MODAL WINDOW -->

      <v-dialog v-model="tenderInfo" persistent max-width="290">
        <!--    <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>-->

        <v-card>
          <v-card-title class="h5">{{ selectedTender.name }}</v-card-title>
          <p class="ml-3">Дата начала приёма заявок: {{ displayUploadDate  }}</p>
          <p class="ml-3">Дата окончания приёма заявок: {{ displayExpirationDate  }}</p>
          <p class="ml-3">Начальная цена: {{ selectedTender.price  }}</p>
          <p class="ml-3">Ссылка на тендер: <a :href="selectedTender.link">{{ selectedTender.link }}</a> </p>
          <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="tenderInfo = false">Неинтересно</v-btn>
            <v-btn color="green darken-1" flat @click.native="tenderInfo = false">Интересно</v-btn>
          </v-card-actions>
        </v-card>


      </v-dialog>


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
          tenders: [
            {
              value: false,
              name: 'Поставка ленточнопильного станка модели МСК-600 TF производства ГК Коско (Россия)',
              area: 'Единая Электронная Торговая Площадка (госзакупки)',
              uploadDate: new Date(2018, 9, 10),
              expirationDate: new Date(2018, 1, 10),
              price: 1271000,
              link: 'http://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=31806906810'
            },
            {
              value: false,
              name: 'Оказание услуг по проведению предрейсовых медицинских осмотров водителей транспортных средств Филиала ФБУЗ «Центр гигиены и эпидемиологии в Нижегородской области в Лукояновском, Большеболдинском, Гагинском, Починковском, Шатковском, Сергачском, Краснооктябрьском, Пильнинском, Сеченовском, Лысковском, Воротынском, Княгининском, Спасском районах»(Филиал ФБУЗ «Центр гигиены и эпидемиологии в Нижегородской области №6).',
              area: 'ЭТП РТС-тендер',
              uploadDate: new Date(2018, 11, 9),
              expirationDate: new Date(2018, 19, 9),
              price: 11960,
              link: 'http://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=31806911239'
            },
            {
              value: false,
              name: 'Поставка ленточнопильного станка Opus 600 c проведением пуско-наладочных работ и инструктажа персонала.',
              area: 'ЭТП Группа Газпромбанка',
              uploadDate: new Date(2018, 24, 8),
              expirationDate: new Date(2018, 28, 9),
              price: 49356,
              link: 'http://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=31806853645'
            },
            {
              value: false,
              name: 'Поставка солода ячменного светлого пильзенского типа для пивоваренного цеха Краснодарского ТПО',
              area: 'Группа ЭТП OTC.RU',
              uploadDate: new Date(2018, 31, 8),
              expirationDate: new Date(2018, 14, 9),
              price: 1920096,
              link: 'http://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=31806880890'
            },
            {
              value: false,
              name: 'Поставка рабочих станций (системный блок, монитор, клавиатура, мышь, источник бесперебойного питания) для нужд МБУЗ «Кореновская ЦРБ» на 2018 год',
              area: 'Сбербанк-АСТ',
              uploadDate: new Date(2018, 13, 9),
              expirationDate: new Date(2018, 21, 9),
              price: 888063,
              link: 'http://www.sberbank-ast.ru/purchaseview.aspx?id=6111172'
            },
            {
              value: false,
              name: 'Поставка лекарственных препаратов (Вакцина для профилактики менингококковых инфекций) для нужд МБУЗ «Кореновская ЦРБ» в 2018 году',
              area: 'Сбербанк-АСТ',
              uploadDate: new Date(2018, 13, 9),
              expirationDate: new Date(2018, 21, 9),
              price: 90100,
              link: 'http://www.sberbank-ast.ru/purchaseview.aspx?id=6111144'
            },
            {
              value: false,
              name: 'Поставка рабочих станций (системный блок, монитор, клавиатура, мышь, источник бесперебойного питания) для нужд МБУЗ «Кореновская ЦРБ» на 2018 год',
              area: 'Сбербанк-АСТ',
              uploadDate: new Date(2018, 13, 9),
              expirationDate: new Date(2018, 21, 9),
              price: 888063,
              link: 'http://zakupki.gov.ru/epz/order/notice/ea44/view/common-info.html?regNumber=0318300000718000374'
            },
            {
              value: false,
              name: 'Поставка лекарственных препаратов (Вакцина для профилактики менингококковых инфекций) для нужд МБУЗ «Кореновская ЦРБ» в 2018 году',
              area: 'Сбербанк-АСТ',
              uploadDate: new Date(2018, 13, 9),
              expirationDate: new Date(2018, 21, 9),
              price: 90100,
              link: 'http://zakupki.gov.ru/epz/order/notice/ea44/view/common-info.html?regNumber=0318300000718000373'
            }

          ]


        }
      },
      methods: {
        showTender(tender){
          this.selectedTender = tender;
          this.tenderInfo = true;
          console.log(this.selectedTender)
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

        displayExpirationDate(){
          if(!!this.selectedTender){
            let date = this.selectedTender.expirationDate;
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

      }


    }
  </script>

