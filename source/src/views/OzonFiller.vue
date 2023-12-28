<template>
    <div class="grid grid-cols-3 gap-20">
        <div class="col-span-1">
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="index">
                        <td>
                            <input v-model="row.value" type="text" class="w-full h-10" placeholder="Введите значение">
                        </td>
                        <td>
                            <template v-if="index === 0">
                                <button @click="addRow"
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    +
                                </button>
                            </template>
                            <template v-else>
                                <button @click="removeRow(index)"
                                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    -
                                </button>
                            </template>
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
                            <input type="text" class="w-full h-10" placeholder="Введите значение">
                        </td>
                        <td>
                            <button @click="send"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                OK
                            </button>
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
                            <input type="radio" class="rdbtn" id="long-sleeve" name="sleeve" value="Длинный рукав">
                            <label for="long-sleeve">Длинный рукав</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio" class="rdbtn" id="short-sleeve" name="sleeve" value="Короткий рукав">
                            <label for="short-sleeve">Короткий рукав</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rows: [{ value: '' }],
            maxRows: 12
        };
    },
    methods: {
        addRow() {
            if (this.rows.length < this.maxRows) {
                this.rows.push({ value: '' });
            }
        },
        removeRow(index) {
            this.rows.splice(index, 1);
        },
        send() {

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