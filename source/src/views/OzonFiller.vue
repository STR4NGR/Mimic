<template>
    <div class="grid grid-cols-4 gap-20">
        <div class="col-span-1">
            <table class="w-full col-span-4">
                <thead>
                    <tr>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index">
                        <div>
                            <td class="w-1"> 
                                <strong class="font-bold"> {{ index + 1 }} </strong> 
                            </td>
                            <td>
                                <input v-model="row.value" type="text" class="w-21 h-10 p-0"
                                    :class="{ 'border-red-500': checkName && this.rows.some(row => row.value === '') }"
                                    placeholder="Введите значение">
                            </td>
                        </div>
                        <td>
                            <template v-if="index === 0">
                                <button @click="addRow"
                                    class="bg-blue-500 
                                    hover:bg-blue-700 
                                    text-white 
                                    font-bold 
                                    w-8
                                    h-10
                                    rounded">
                                    +
                                </button>
                            </template>
                            <template v-else>
                                <button @click="removeRow(index)"
                                    class="bg-red-400 
                                    hover:bg-red-700 
                                    text-white 
                                    font-bold 
                                    w-8
                                    h-10
                                    rounded">
                                    -
                                </button>
                            </template>
                        </td>
                        <td>
                            <template v-if="index === 0">
                                <input v-model="count" class="w-6 h-10 p-0">
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div v-if="checkName && this.rows.some(row => row.value === '')"
                                class="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded relative"
                                role="alert">
                                <strong class="font-bold">Проверьте значения всех полей!</strong>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-span-1">
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Номер объединения</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input id="unity" type="text" class="w-full h-10" v-model="unity"
                                :class="{ 'border-red-500': checkUnity && unity === '' }" placeholder="Введите значение">
                        </td>
                        <td>
                            <button @click="sendData"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                OK
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div v-if="checkUnity && unity === ''"
                                class="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded relative"
                                role="alert">
                                <strong class="font-bold">Обязательное поле!</strong>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-span-1">
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Тип рукава</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="radio" class="rdbtn" id="long-sleeve" name="sleeve" v-model="sleeveOption"
                                value="Длинный рукав">
                            <label for="long-sleeve">Длинный рукав</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio" class="rdbtn" id="short-sleeve" name="sleeve" v-model="sleeveOption"
                                value="Короткий рукав">
                            <label for="short-sleeve">Короткий рукав</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div v-if="checkSleeve && !(sleeveOption)"
                                class="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded relative"
                                role="alert">
                                <strong class="font-bold">Нужно выбрать один из параметров!</strong>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-span-1">
            <table class="w-full">
                <tbody>
                    <tr>
                        <td>
                            <input id="client-id" type="text" class="w-full h-10" v-model="clientID"
                                :class="{ 'border-red-500': checkCred && clientID === '' }" placeholder="Client ID">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input id="api-key" type="text" class="w-full h-10" v-model="apiKey"
                                :class="{ 'border-red-500': checkCred && apiKey === '' }" placeholder="API Key">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div v-if="checkCred && ((clientID === '') || (apiKey === ''))"
                                class="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded relative"
                                role="alert">
                                <strong class="font-bold">Проверьте значения всех полей!</strong>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            count: 1,
            sleeveDict: 0,
            sleeveWeight: 0,
            rows: [{ value: '' }],
            unity: '',
            sleeveOption: '',
            clientID: '',
            apiKey: '',
            maxRows: 12,
            errors: [{ value: '' }],
            checkName: false,
            checkUnity: false,
            checkSleeve: false,
            checkCred: false
        };
    },
    methods: {
        addRow() {
            if (this.rows.length < this.maxRows) {
                for (let i = 0; i < this.count; i++) {
                    this.rows.push({ value: this.rows[0].value });
                }
            }
        },
        removeRow(index) {
            this.rows.splice(index, 1);
        },
        async sendData() {
            const headers = {
                'Client-Id': this.clientID, // 1534308
                'Api-Key': this.apiKey, // d0d3c300-7171-4004-8596-53f4e9ef9f80
                'Content-Type': 'application/json'
            }
            const url = 'https://api-seller.ozon.ru/v2/product/import'
            const data = this.getData()
            if (data !== null) {
                axios.post(url, data, { headers })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        getData() {
            let data = { "items": [] }
            this.checkParams()
            if (!(this.checkName) && !(this.checkUnity) && !(this.checkSleeve) && !(this.checkCred)) {
                this.rows.forEach((row, index) => {
                    data.items.push(this.request(row.value, index, unity.value));
                    this.freeInput()
                })
                return data
            } else {
                return null
            }
        },
        freeInput() {
            this.rows = [{ value: '' }]
            this.unity = ''
            this.sleeveOption = ''
            this.count = 1
            this.rows.splice(1)
        },
        checkParams() {
            this.checkName = this.rows.some(row => row.value === "")
            if (this.unity === '') {
                this.checkUnity = true
            }
            else if (this.unity !== '') {
                this.checkUnity = false
            }
            if (!(this.sleeveOption)) {
                this.checkSleeve = true
            }
            else if (this.sleeveOption) {
                this.checkSleeve = false
            }
            if ((this.clientID === '') || (this.apiKey === '')) {
                this.checkCred = true
            }
            else if ((this.clientID !== '') && (this.apiKey !== '')) {
                this.checkCred = false
            }
            if (this.sleeveOption === 'Длинный рукав') {
                this.sleeveDict = 82093
                this.sleeveWeight = 400
            }
            if (this.sleeveOption === 'Короткий рукав') {
                this.sleeveDict = 82094
                this.sleeveWeight = 300
            }
        },
        request(name, index, unity) {
            let size = [
                '35650', // 1
                '35461', // 2
                '35483', // 3
                '35534', // 4
                '35571', // 5
                '35582', // 6
                '35591', // 7
                '35724', // 8
                '35723', // 9
                '35732', // 10
                '35898', // 11
                '35792', // 12
            ]
            let newItem = {
                "attributes": [
                    {
                        "id": 9163, // Пол
                        "values": [
                            {
                                "dictionary_value_id": 22880,
                            }
                        ]
                    },
                    {
                        "id": 8229, // Тип
                        "values": [
                            {
                                "dictionary_value_id": 93209,
                            }
                        ]
                    },
                    {
                        "id": 31, // Бренд
                        "values": [
                            {
                                "value": "Нет бренда"
                            }
                        ]
                    },
                    {
                        "id": 4503, // Коллекция
                        "values": [
                            {
                                "dictionary_value_id": 39116,
                            }
                        ]
                    },
                    {
                        "id": 4508, // Размер товара на фото
                        "values": [
                            {
                                "dictionary_value_id": 39376,
                            }
                        ]
                    },
                    {
                        "id": 4509, // Параметры модели на фото
                        "values": [
                            {
                                "value": "50-52"
                            }
                        ]
                    },
                    {
                        "id": 4596, // Длина рукава
                        "values": [
                            {
                                "dictionary_value_id": this.sleeveDict, //82093 - длинный, 82094 - короткий
                            }
                        ]
                    },
                    {
                        "id": 4655, // Инструкция по уходу
                        "values": [
                            {
                                "value": "Ручная или деликатная машинная стирка рубашки"
                            }
                        ]
                    },
                    {
                        "id": 4300, // Тип упаковки
                        "values": [
                            {
                                "dictionary_value_id": 44412,
                            }
                        ]
                    },
                    {
                        "id": 11650, // Количество упаковок
                        "values": [
                            {
                                "value": "1"
                            }
                        ]
                    },
                    {
                        "id": 10096, // Цвет
                        "values": [
                            {
                                "dictionary_value_id": 369939085,
                            }
                        ]
                    },
                    {
                        "id": 4295, // Российский размер
                        "values": [
                            {
                                "dictionary_value_id": size[index],
                            }
                        ]
                    },
                    {
                        "id": 22232, // ТН ВЭД коды ЕАЭС
                        "values": [
                            {
                                "dictionary_value_id": 971398646,
                            }
                        ]
                    },  
                    {
                        "id": 8292, // Значение для объединения
                        "values": [
                            {
                                "value": unity
                            }
                        ]
                    },
                ],
                "category_id": 17037056,
                "color_image": "",
                "complex_attributes": [],
                "currency_code": "RUB",
                "depth": 350,
                "dimension_unit": "mm",
                "height": 60,
                "images": [
                    "https://raw.githubusercontent.com/STR4NGR/Mixify/main/source/public/fileFiller.jpg"
                ],
                "images360": [],
                "name": name,
                "offer_id": name,
                "pdf_list": [],
                "price": "7777",
                "primary_image": "",
                "vat": "0",
                "weight": this.sleeveWeight, // длинный - 400, коротки - 300
                "weight_unit": "g",
                "width": 300
            }
            return newItem
        }
    }
};
</script>

<style>
.grid {
    height: 100vh;
    color: black;
}

button {
    width: 60px;
    margin-top: 10px;
    margin-bottom: 10px;
}

input {
    margin-top: 10px;
    margin-bottom: 10px;
    text-indent: 10px;
    background-color: white;
    border: 1px solid blue;
}

.rdbtn {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: #449d44;
    border-color: #449d44;
}

.accept {
    margin-left: 1%;
    margin-top: 200%;
    margin-left: -80%;
}
</style>