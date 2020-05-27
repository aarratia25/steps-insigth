<template>
 <v-layout column>
       <v-toolbar flat color="bg_transparent">
      <span>
        <img src="@/assets/logo.png" height="55">
      </span>
      <v-toolbar-title class="text_title">
        {{ viewName }}
      </v-toolbar-title>
    </v-toolbar>
  <v-stepper v-model="stepperIndex">
    <v-stepper-header>
      
      <v-stepper-step :complete="stepperIndex > 1" step="1">Tipo de Requerimiento</v-stepper-step>
      
      <v-divider></v-divider>
      
      <v-stepper-step :complete="stepperIndex > 2" step="2">Datos de Contacto</v-stepper-step>
      
      <v-divider></v-divider>
      
      <v-stepper-step :complete="stepperIndex > 3" step="3">
        {{ stepperIndex3 }}
      </v-stepper-step>

      <v-divider></v-divider>
      
      <v-stepper-step :complete="stepperIndex > 4" step="4">Requerimientos Técnicos</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stepperIndex > 5" step="5">Visualización de Sugerencias</v-stepper-step>

    </v-stepper-header>

    <!--  ********************** Requirements Form ********************** -->
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-layout justify-center>
          <v-flex xs4 sm4 v-for="card in cards" :key="card.id">
            <v-card max-width="344"  class="mx-auto">
                <v-list-item>
                    <v-list-item-title class="headline" v-text="card.title"></v-list-item-title>
                </v-list-item>
                <v-img :src="card.src" height="250"></v-img>
                <v-card-text v-text="card.desc"></v-card-text>
                <v-layout justify-center align-center>
                    <v-card-actions justify-center>
                        <v-form v-model="form.requirements.valid" ref="formRequirements" lazy-validation>
                          <v-checkbox
                            :rules="validationsRules.rulesRequirements"
                            v-model="form.requirements.options"
                            :label="card.title"
                            :value="card.title">
                          </v-checkbox>
                        </v-form>
                    </v-card-actions>
                </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <br>
        <v-btn color="primary" @click="validateRequirementsForm()">
          Siguiente
        </v-btn>
      </v-stepper-content>

      <!--  ********************** Contact Information ********************** -->
      <v-stepper-content step="2">
        <v-card class="mb-5" color="grey lighten-4 pa40">
        <span>(*) Requerido</span>
        <v-layout>
          <v-flex xs12 sm12>
            <v-form v-model="form.contact.valid" ref="contactInformation" lazy-validation>
              <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field :rules="validationsRules.rulesContact.firstName"  v-model="form.contact.firstName" label="* Nombre" prepend-icon="person"></v-text-field>
                        <v-text-field :rules="validationsRules.rulesContact.lastName" v-model="form.contact.lastName" label="* Apellido" prepend-icon="person"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :rules="validationsRules.rulesContact.phoneNumber" v-model="form.contact.phoneNumber" type="number" label="* Télefono" prepend-icon="phone_in_talk"></v-text-field>
                        <v-text-field :rules="validationsRules.rulesContact.emailAddress" v-model="form.contact.emailAddress" label="* Correo Electronico" prepend-icon="alternate_email"></v-text-field>
                    </v-col>
                  </v-row>
              </v-container>
            </v-form>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="requirementsAnalysis()">
          Siguiente
        </v-btn>
        <v-btn text @click="stepperIndex = 1">Atrás</v-btn>
        </v-card>
      </v-stepper-content>

      <!--  ********************** Perfil Empresarial - No Empresarial ********************** -->
      <v-stepper-content step="3">
        <v-card class="mb-5" color="grey lighten-4 pa40">
        <v-layout justify-center align-center>
           <v-radio-group row @change="changeRadioGroup($event)">
                <v-radio label="Si, tengo empresa" color="success" value="have-company"></v-radio>
                <v-radio label="No, tengo empresa" color="info" value="no-have-company"></v-radio>
            </v-radio-group>
        </v-layout>
         <v-form v-if="showBusiness" v-model="form.businessOrPeople.valid" ref="formBusinessOrPeople" lazy-validation>
            <span>(*) Requerido</span>
            <v-container>
              <v-layout>
                <v-flex xs12 md12>
                  
                  <div v-if="form.businessOrPeople.model">
                    <v-text-field 
                      :rules="validationsRules.rulesforBusiness.name" 
                      v-model="form.businessOrPeople.name" 
                      label="* ¿Como se llama su empresa?"
                      prepend-icon="person">
                    </v-text-field>

                    <v-textarea 
                      :rules="validationsRules.rulesforBusiness.description" 
                      v-model="form.businessOrPeople.description" 
                      label="¿A que se dedica su empresa?"
                      prepend-icon="location_city">
                    </v-textarea>
                  </div>
                  <div v-else>
                      <v-label>Ejemplo: Influencer, Abogado, Profesor.</v-label>
                      <v-text-field 
                        :rules="validationsRules.rulesforBusiness.name" 
                        v-model="form.businessOrPeople.name" 
                        label="* Ocupación" prepend-icon="location_city">
                      </v-text-field>
                  </div>

                </v-flex>

                  <v-flex xs12 md12>

                  <v-checkbox
                    v-model="showItemsWebsite"
                    label="¿Tiene usted pagina web o app activa en este momento?">
                  </v-checkbox>

                  <div v-if="showItemsWebsite">
                    <v-text-field 
                      :rules="validationsRules.rulesforBusiness.linkWebsite" 
                      v-model="form.businessOrPeople.linkWebsite" 
                      label="Link a su sitio web" 
                      prepend-icon="public">
                    </v-text-field>

                    <v-text-field 
                      :rules="validationsRules.rulesforBusiness.linkApp" 
                      v-model="form.businessOrPeople.linkApp" 
                      label="Link o nombre del App" 
                      prepend-icon="touch_app"> 
                    </v-text-field>
                  </div>

                  <v-checkbox
                    v-model="showItemsRrss"
                    label="¿Tiene usted presencia en Redes sociales?">
                  </v-checkbox>

                  <div v-if="showItemsRrss">
                    <v-text-field 
                      v-model="form.businessOrPeople.linkFacebook" 
                      :rules="validationsRules.rulesforBusiness.linkWebsite" 
                      label="Link Facebook"
                      prepend-icon="thumb_up">
                    </v-text-field>

                    <v-text-field 
                      v-model="form.businessOrPeople.linkInstagram" 
                      :rules="validationsRules.rulesforBusiness.linkWebsite" 
                      label="Link Instagram"
                      prepend-icon="thumb_up">
                    </v-text-field>

                    <v-text-field 
                      v-model="form.businessOrPeople.linkTwitter" 
                      label="Link Twitter"
                      prepend-icon="thumb_up">
                    </v-text-field>

                    <v-text-field 
                      v-model="form.businessOrPeople.linkYouTube" 
                      label="Link Youtube"
                      prepend-icon="thumb_up">
                    </v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        <v-btn color="primary" :disabled="disabledNext" @click="technicalRequirements()">
          Siguiente
        </v-btn>
        
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card class="mb-5" color="grey lighten-4 pa40">
        <v-layout justify-center>
          <v-flex xs12 sm12>
            <v-form  ref="formTechnicalRequirements" lazy-validation>
              <v-container fluid>
                  <v-row>
                    <v-col cols="6" sm="6">
                        <v-select 
                            v-model="form.technicalRequirements.colors"
                            :items="form.technicalRequirements.colors"
                            :rules="validationsRules.technicalRequirements.colorsRules"
                            prepend-icon="palette"
                            chips
                            label="Colores relacionados a su Empresa o Marca"
                            multiple>
                          </v-select>
                        <v-btn color="primary" text small @click.stop="dialog = true">
                            Selecionar Colores
                        </v-btn>
                        
                      <v-btn color="primary" text small @click.stop="dialogRefLinkWebsite = true">
                            Agregar sitios webs Referenciales
                      </v-btn>
                    </v-col>

                    <v-col cols="6" sm="6">
                       <v-select
                        v-model="form.technicalRequirements.listModel"
                        :items="list"
                        menu-props="auto"
                        label="Tiene afinidad por algun entorno de desarrollo de ecommerce"
                        hide-details
                        prepend-icon="shopping_cart"
                        single-line>
                      </v-select>

                      <div style="height:7px;"></div>
                      <v-text-field 
                        label="Seleccione Logo" 
                        @click="pickFile('Img');" 
                        v-model='Img.imageName'
                        prepend-icon='attach_file' 
                        readonly>
                      </v-text-field>

                      <input type="file" 
                        style="display: none" 
                        ref="Img" accept="image/*" 
                        @change="onFilePicked($event, 'Img')">
                      
                      <img :src="Img.imageUrl" height="55" v-if="Img.imageUrl" />
                  </v-col>
                    <v-col v-for="(item, index) in colsQuestions" :key="index">
                      <div v-for="(item, question) in form.technicalRequirements.questions" :key="question">
                          <v-switch v-if="(index + 1) == item.group"
                            v-model="item.model"
                            :label="item.name">
                          </v-switch>

                          <v-text-field 
                            v-model="item.modelMore" 
                            v-if="(index + 1) == item.group && item.model && item.show"
                            :label="item.label"
                            :type="item.type" 
                            :rules="validationsRules.technicalRequirements.quantityRules">
                          </v-text-field>
                      </div>
                    </v-col>
                  </v-row>
              </v-container>
            </v-form>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click="AnalyzeFormData()">
          Analizar
        </v-btn>
        </v-card>
      </v-stepper-content>

    <!--  ********************** General Modal ********************** -->
    <v-row justify="center">
      <v-dialog v-model="dialogGeneral" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
             ¡Espere un momento!
          </v-card-title>
          <v-card-text>Estimado usuario para que nuestro algoritmo genere las referencias, de template debe responder por lo menos 5 preguntas.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogGeneral = false">Continuar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  ********************** Modal Colors ********************** -->
    <v-dialog v-model="dialog" max-width="350">
      <v-card >
        <v-card-title class="headline">Colores</v-card-title>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12 sm12>
            <v-container fluid>
                <swatches-picker :value="form.technicalRequirements.colors" @input="updateValue"></swatches-picker>
            </v-container>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <!--  ********************** Generate Link ********************** -->
    <v-dialog v-model="dialogRefLinkWebsite" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Referencias de Páginas Web</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <small>Ejemplo de Link: www.conversionsinsight.com</small>
                <div v-for="(item, index) in form.technicalRequirements.links" :key="index"> 
                  <v-text-field 
                    v-model="item.link"
                    :rules="validationsRules.technicalRequirements.emptyRulesValidWeb"
                    :append-icon="index > 0 ? 'delete' : null"
                    :label="'Link ' + (index + 1)"
                    @click:append="removeFormLink(index)">
                  </v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="buttonAddFormLink" color="blue darken-1" text @click="addFormLink()">Agregar otro Link</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-stepper-items>
  </v-stepper>
  </v-layout>
</template>

<script>
  import { Swatches } from 'vue-color';
  export default {
    components: {
      'swatches-picker': Swatches,
    },
    data () {
      return {
        dialogGeneral:false,
        dialogRefLinkWebsite: false,
        dialog: false,
        viewName: this.$route.meta.title,
        stepperIndex: 4,
        stepperIndex3: '¿Tiene usted empresa?',
        cards: [
          {
            title: 'Ecommerce',
            desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem modi et quis porro aliquam iste fugit doloremque inventore? Adipisci maxime magnam eum doloribus tempora minima impedit. Aut quae maxime tempora?',
            src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
            flex: 12
          },
          {
            title: 'Website',
            desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem modi et quis porro aliquam iste fugit doloremque inventore? Adipisci maxime magnam eum doloribus tempora minima impedit. Aut quae maxime tempora?',
            src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
            flex: 6
          },
          {
            title: 'App',
            desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem modi et quis porro aliquam iste fugit doloremque inventore? Adipisci maxime magnam eum doloribus tempora minima impedit. Aut quae maxime tempora?',
            src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
            flex: 6
          }
        ],
        list: [
          'WooCommerce',
          'Magento',
          'Shopify',
          'PrestaShop',
          'MonsterCommerce',
          'VirtueMart',
          'WixStores',
          'BigCommerce',
          'OpenCart',
          'osCommerce',
          'Otros'
        ],
        colsQuestions :[
          {
            flex: 6,
          },
          {
            flex: 6
          }
        ], 
        Img: {
          imageName: null,
          imageUrl: null,
        },
        buttonAddFormLink:false,
        showBusiness:false,
        disabledNext:true,
        showItemsWebsite:false,
        showItemsRrss:false,
        form:{
          requirements:{
              valid: true,
              options:[],
          },
          contact:{
            valid: true,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            emailAddress: null,
          },
          businessOrPeople: {
            valid:true,
            profile: null,
            name:null,
            description:null,
            linkWebsite:null,
            linkApp:null,
            linkFacebook:null,
            linkInstagram:null,
            linkTwitter:null,
            linkYouTube:null,
          },
          technicalRequirements:{
            colors: [],
            links: [
              {
                  link: null,
              }
            ],
            listModel:null,
            Img: null,
            questions: [
              {
                group: 1,
                name: 'Le gustaria una web visible en multiples dispositivos?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 1,
                name: 'Le gustaría una web multilenguaje?',
                model: false,
                from: null,
                show: true,
                modelMore: null,
                label: 'Indique cuantos lenguajes desea',
                type: 'number'
              },
              {
                group: 1,
                name: 'Prefiere una web app o por el contrario ambas separadas?',
                model: false,
                from:'website-app',
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 1,
                name: 'Desea hosting + dominio?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 1,
                name: 'desea posicionamiento SEO en su plataforma?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 1,
                name: 'desea agentes de marketing para llevar su marca o empresa en internet?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 2,
                name: 'desea equipo de desarrollo para mantener su plataforma?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 2,
                name: 'Le gustaria que su plataforma cuente con tecnologias de gestion en tiempo real?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 2,
                name: 'Posee elementos como imagenes, tipografias entre otros elementos para su plataforma?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
              {
                group: 2,
                name: 'Prefiere que su sitio web este en una sola pagina o por su defecto tener varias paginas?',
                model: false,
                from: null,
                show: false,
                modelMore: null,
                label: null,
                type: null
              },
            ]
          }
        },
        validationsRules: {
          rulesRequirements: [
            v => v.length > 0 || 'You must agree to continue!'
          ],
          rulesContact: {
            firstName:  [
              v => !!v || 'Name is required',
              v => (v && v.length < 10) || 'Name must be less than 10 characters',
              v => (v && v.length > 5) || 'Name must be less than 5 characters',
            ],
            lastName:  [
              v => !!v || 'lastName is required',
              v => (v && v.length < 10) || 'Name must be less than 10 characters',
              v => (v && v.length > 5) || 'Name must be less than 5 characters',
            ],
            phoneNumber: [
              v => !!v || 'phoneNumber is required',
              v => (v && v.length < 15) || 'phoneNumber must be less than 10 characters',
              v => (v && v.length > 5) || 'phoneNumber must be less than 5 characters',
            ],
            emailAddress: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
          },
          rulesforBusiness: {
            name: [
              v => !!v || 'Name is required',
              v => (v && v.length < 10) || 'Name must be less than 10 characters',
              v => (v && v.length > 5) || 'Name must be less than 5 characters',
            ],
            description: [
              v => !!v || 'description is required',
              v => (v && v.length < 200) || 'Name must be less than 200 characters',
              v => (v && v.length > 5) || 'Name must be less than 5 characters',
            ],
            linkWebsite: [
              v => !!v || 'linkWebsite Website is required.',
              v => this.validateUrl(v) || 'linkWebsite Website It has no web format.'
            ],
          },
          technicalRequirements: {
            emptyRulesValidWeb:[
              v => !!v || 'Required',
              v => this.validateUrl(v) || 'linkWebsite Website It has no web format.'
            ],
            colorsRules: [
              v => v.length < 4 || 'No puede agregar más colores'
            ],
            quantityRules: [
              v => !!v || 'phoneNumber is required',
            ],
            rulesQuestion: [
              v => v.length < 0 || 'You must agree to continue!'
            ],
          }
        },
      }
    },
    computed:{
      
    },
    methods: {
      AnalyzeFormData(){
          let questions = this.form.technicalRequirements.questions;
          let arr = [];

          questions.forEach(function (item) {
            if (item.model) {
              arr.push(item.model);
            }
          });
          
          if ( arr.length <= 4 ) {
            this.dialogGeneral = true;
          }
      },
      addFormLink(){
        
        if (this.form.technicalRequirements.links.length > 3) {
          this.buttonAddFormLink = true;
        } 

        this.form.technicalRequirements.links.push({
            link: null
        });
      },
      removeFormLink(index){
        if (index == 1) {
          this.buttonAddFormLink = false;
        } 

        this.form.technicalRequirements.links.splice(index, 1);
      },
      updateValue(color){
        let colors = this.form.technicalRequirements.colors;

        if( colors.length <= 3 && colors.indexOf(color.hex8) === -1 ) {
          colors.push(color.hex8);
        }

      },
      technicalRequirements(){
        
        if (this.$refs.formBusinessOrPeople.validate()) {
          this.stepperIndex = 4;
        }

      },
      changeRadioGroup(event){
        this.showBusiness = true;
        this.disabledNext = false;

        if (event == 'have-company'){
          this.stepperIndex3 = 'Perfil Empresarial'
          this.form.businessOrPeople.profile = this.stepperIndex3;
        } else {
          this.stepperIndex3 = 'Perfil no Empresarial'
          this.form.businessOrPeople.is = this.stepperIndex3;
        }
      },
      validateUrl(str) {
         return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
      },
      validateRequirementsForm(){
         
        let push = false;

        this.$refs.formRequirements.forEach(function (item) {

          if (item.validate()) {
            push = true;
          } 
          
        });

        if (push) {
          this.stepperIndex = 2;
        }

      },
      requirementsAnalysis(){
        if (this.$refs.contactInformation.validate()) {
          this.stepperIndex = 3;
        }
      },
      pickFile(imgType) {
        this.$refs[imgType].click();
      },
      onFilePicked(e, imgType) {
        const files = e.target.files
        
        if (files[0] !== undefined) {

          this[imgType].imageName = files[0].name

          if (this[imgType].imageName.lastIndexOf('.') <= 0) {
            return
          }

          const fr = new FileReader()

          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {

            this[imgType].imageUrl = fr.result;

            this.form.technicalRequirements[imgType] = files[0];

          })
        } 
      },
    }
  }
</script>

<style lang="scss">
  .pa40{
      padding: 20px;
  }
</style>
