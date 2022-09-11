<template>
    <div class=" bg-gray-200 ">
        <div class="container mx-auto py-6 px-4">
            <h1 class="text-3xl  border-b mb-4">Datatable</h1>
            <div class="mb-4 flex justify-between items-center">
                <div class="flex-1 pr-4">
                    <div class="relative md:w-1/3">
                        <input v-model="search" type="search" class="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline focus:outline-offset-1 focus:outline-teal-400 text-gray-600 font-medium" placeholder="Search...">
                       
                        <div class="absolute top-0 left-0 inline-flex items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                <circle cx="10" cy="10" r="7"></circle>
                                <line x1="21" y1="21" x2="15" y2="15"></line>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- todo -> btn add -->
                <btnAdd :edit="employ" @save="clickAdd"/>
                <div>
                    <!-- <button class="rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4">ADD</button> -->
                   
                </div>
            </div>
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table  class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                ID
                            </th>
                            <th @click="sort('first_name')" scope="col" class="py-3 px-6 cursor-pointer " v-if="currentSortDir ==='asc' ? '▲' : '▼' " >
                                <!-- <div v-if="currnetSortDir ==='asc' ? '▲' : '▼' "></div> -->
                                First name 
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Last name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Age
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Salary
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in sortedCats" :key="item.index" class="bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                            <td class="py-4 px-6">
                                {{item.id}}
                            </td>
                            <th  scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ item.first_name }}
                            </th>
                            <td class="py-4 px-6">
                                {{ item.last_name }}
                            </td>
                            <td class="py-4 px-6">
                                {{ item.age }}
                            </td>
                            <td class="py-4 px-6">
                                {{ formatPrice(item.salary) }}
                            </td>
                            <td class="py-4 px-6">
                                <a href="#" v-b-modal.modal-prevent-closing @click="clickEdit(item)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a href="#" @click="clickDelete(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline py-4 px-6 ">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                    <div v-if="search&&!seachValue.length"> 
                            <P class=" text-center" > NO FOUND DATA </P>
                    </div>
                </table>
            </div>
            <!-- TINH TONG --> 
            <div class="mb-4 my-4 flex justify-between items-center ">
                    <div class="relative md:w-1/3">
                        <!-- ? chu tong -->
                            <p v-show="Sum" class="w-full bg-slate-50 pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline focus:outline-offset-1 focus:outline-teal-400  font-medium text-gray-500"> 
                                {{formatPrice(SumSalary)}}
                            </p>
    
                        <div class="absolute top-0 left-0 inline-flex items-center p-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                                <path d="M14 3v5h5M12 18v-6M9 15h6"/>
                            </svg>
                        </div>
                    </div>
                    <button v-on:click="Sum = !Sum" class="rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4">
                        Sum
                    </button>
            </div>
        </div>
    </div>
    </template>
    
    <script>
        import btnAdd from "@/components/btnAdd.vue"
    export default {
      
      components: { 
        btnAdd,
        },
            name : "dataTable",
            props: {
                list: Array,
            },
            data() {
                return {
                    employ:{},
                    search: "", 
                    Sum: false,
                    listTable:[],
                    currentSort: "name",
                    currentSortDir: "asc",
                }
            },
            
        methods: {
            formatPrice(value) {
                return new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "VND",
                }).format(value);
            },
            // nút xóa
            clickDelete(index) {
                console.log(index);
                const deleteList = this.list;
                deleteList.splice(index, 1);
            },
            // nút thêm thông tin
            clickAdd(item){
                let newADD = this.list
                // tìm id khi edit
                let index = this.list.findIndex((c)=> c.id === item.id )
                // kiểm tra id khi xem trùng ko 
                if(index >=0){
                    // xóa dữ liệu 1 cột khi edit xong để ko bị trùng
                    newADD.splice(index,1,item)
                } else{
                    // thêm mới dữ liệu
                    newADD.push(item)
                }
                    return
            },
            // nút edit
            clickEdit(item){
                this.employ = item
                console.log(item)
            },
            // hàm sort theo thứ tự
            sort(s) {
                //if s == current sort, reverse
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
            }
        },
        computed: {
            // hàm search 
            seachValue() {
                return this.list.filter((item) => {
                return item.first_name.toLowerCase().includes(this.search.trim().toLowerCase());
                });
            },
            // tính tổng 
            SumSalary() {
            return this.list.reduce((acc, item) => acc + item.salary, 0);
            },
            // lọc theo tên 
            sortedCats() {
                const listTable = this.seachValue;
                return listTable.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if (
                this.currentSort === "first_name" 
                ) {
                    if (
                        a[this.currentSort].toLowerCase() <
                        b[this.currentSort].toLowerCase()
                    )
                        return -1 * modifier;
                    if (
                        a[this.currentSort].toLowerCase() >
                        b[this.currentSort].toLowerCase()
                    )
                        return 1 * modifier;
                } else {
                    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                }
                return 0;
                });
      }
            
        },
        
    }
    </script>
    
    <style >
    
    </style>