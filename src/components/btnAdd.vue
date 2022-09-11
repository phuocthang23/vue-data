<template>
    <div>
      <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>
  
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Sign in to our platform"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <!-- id -->
          <b-form-group label="ID" invalid-feedback="Name is required" >
            <b-form-input type="number" id="name-input" v-model="form.id" ></b-form-input>
          </b-form-group>
          <!-- first name -->
          <b-form-group label="first name" invalid-feedback="Name is required" :state="nameState">
            <b-form-input type="text" id="name-input" v-model="form.first_name" :state="nameState" required></b-form-input>
          </b-form-group>
          <!-- last name -->
          <b-form-group label="last name"  invalid-feedback="Name is required" :state="nameState">
            <b-form-input type="text" id="name-input" v-model="form.last_name" :state="nameState" required></b-form-input>
          </b-form-group>
          <!-- age -->
          <b-form-group label="Age"  invalid-feedback="Name is required">
            <b-form-input type="number" id="name-input" v-model="form.age" ></b-form-input>
          </b-form-group>
          <!-- salary -->
          <b-form-group label="Salary"  invalid-feedback="Name is required" :state="nameState">
            <b-form-input type="number" id="name-input" v-model="form.salary" :state="nameState" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
    export default {
      props:{
        edit: {
            type: Object,
            default: null,
        }
      },

      watch:{
            edit(){
            if(this.edit){
                this.form = Object.assign({}, this.edit)
            }else{
                this.form ={}
            }
        }
    },
    
      data() {
        return {
            form:{
            id:Math.floor(Math.random() * (99 - 10)) + 10,
            fisrt_name:'',
            last_name:'',
            age:Math.floor(Math.random() * (80 - 18)) + 18,
            salary:'',
            },
          name: '',
          nameState: null,
          submittedNames: []
        }
      },
      methods: {
        checkFormValidity() {
          const valid = this.$refs.form.checkValidity()
          this.nameState = valid
          return valid
        },
        resetModal() {
          this.name = ''
          this.nameState = null
        },
        handleOk(bvModalEvent) {

            console.log(this.form);
            // truyền dữ liệu sang 1 component
            this.$emit("save", this.form);
            // reset dữ liệu
            this.form = {
                id:Math.floor(Math.random() * (99 - 10)) + 10,
                fisrt_name:'',
                last_name:'',
                age:Math.floor(Math.random() * (80 - 18)) + 18,
                salary:'',
            };
          // Prevent modal from closing
          bvModalEvent.preventDefault()
          // Trigger submit handler
          this.handleSubmit()
        },
        handleSubmit() {
          // Exit when the form isn't valid
          if (!this.checkFormValidity()) {
            return
          }
          // Push the name to submitted names
          this.submittedNames.push(this.name)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
          })
        }
      }
    }
  </script>