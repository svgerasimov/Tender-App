<template>
  <v-data-table
    :headers="headers"
    :items="tenders"
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
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.area }}</td>
      <td class="text-xs-right">{{ props.item.uploadDate }}</td>
      <td class="text-xs-right">{{ props.item.expirationDate }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
    </template>
  </v-data-table>
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
          }


        ]


      }
    },
  }
</script>
