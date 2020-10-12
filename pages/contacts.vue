<template>
  <main>
    <section class="saved-headings">
      <content-box id="articles-page-headings">
        <p class="saved-headings__amount">
          <span id="saved-user-name">{{ username }}, </span> у вас
          {{ contactsAmount }}
          сохранённых контактов
        </p>
        <button class="add-btn" @click="showAddPopup">Добавить контакт</button>
      </content-box>
    </section>

    <section class="result">
      <content-box class="result__container">
        <div
          class="contact"
          v-for="(item, index) in contacts"
          :key="index"
          :class="'cont' + item._id"
        >
          <h2 class="contact__title">{{ item.name }}</h2>
          <p class="contact__phone">{{ item.phone }}</p>
          <div class="contact__icons">
            <img
              src="trash.png"
              alt="Удалить"
              class="contact__action"
              @click="deleteContact(item)"
            />
            <img
              src="edit.png"
              alt="Редактировать"
              class="contact__action"
              @click="editContactForm(item)"
            />
          </div>
        </div>
      </content-box>
    </section>
    <popup v-if="popupShown">
      <add-form v-if="addForm" />

      <form
        v-if="editForm"
        @submit.prevent="editSubmitContact"
        class="popup__form"
        id="edit-contact-form"
        novalidate
      >
        <h3 class="popup__title">Изменить контакт</h3>
        <p class="popup__label">Имя</p>
        <input
          name="name"
          type="text"
          class="popup__input"
          id="edit-input-name"
          :placeholder="editName"
          minlength="2"
          maxlength="30"
          v-model="name"
          @input="validation"
          required
        />
        <p class="popup__error" id="add-email-error"></p>
        <p class="popup__label">Телефон</p>
        <input
          name="phone"
          type="text"
          class="popup__input"
          id="edit-input-phone"
          minlength="5"
          maxlength="12"
          pattern="[0-9\-]*"
          :placeholder="editPhone"
          v-model="phone"
          @input="validation"
          required
        />
        <p class="popup__error"></p>
        <p class="popup__error popup__error_server" id="add-server-error">
          {{ serverError }}
        </p>
        <button
          type="submit"
          class="popup__button"
          :class="{ popup__button_active: button }"
          id="edit-btn"
          disabled
        >
          Добавить
        </button>
      </form>
    </popup>
  </main>
</template>

<script>
import Content from '@/components/content'
import Popup from '@/components/popup'
import Add from '@/components/forms/addContact'
import Edit from '@/components/forms/editContact'
import axios from 'axios'
export default {
  computed: {
    popupShown() {
      return this.$store.getters['popup/getPopupShown']
    },
    addForm() {
      return this.$store.getters['popup/getAdd']
    },
    editForm() {
      return this.$store.getters['popup/getEdit']
    },
  },
  components: {
    'content-box': Content,
    popup: Popup,
    'add-form': Add,
    'edit-form': Edit,
  },
  data() {
    return {
      username: '',
      contactsAmount: '',
      contacts: '',
      name: '',
      phone: '',
      editName: '',
      editPhone: '',
      button: false,
      serverError: '',
      id: '',
    }
  },
  methods: {
    validation() {
      const nameField = document.querySelector('#edit-input-name')
      const phoneField = document.querySelector('#edit-input-phone')
      const btn = document.querySelector('#edit-btn')
      if (nameField.validity.valid && phoneField.validity.valid) {
        this.button = true
        btn.removeAttribute('disabled')
      } else {
        this.button = false
        btn.setAttribute('disabled', 'true')
      }
    },
    showAddPopup() {
      this.$store.commit('popup/togglePopUp')
      this.$store.commit('popup/toggleAdd')
    },
    showEditPopup() {
      this.$store.commit('popup/togglePopUp')
      this.$store.commit('popup/toggleEdit')
    },
    getName(token) {
      return axios
        .get('https://api.diploma.ml/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.username = res.data.name
        })
    },
    deleteContact(item) {
      const card = document.querySelector(`.cont${item._id}`)
      const JWT_TOKEN = localStorage.getItem('token')

      return axios
        .delete(`https://api.diploma.ml/contacts/${item._id}`, {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
        .then(() => {
          card.remove()
        })
    },
    editContactForm(item) {
      this.showEditPopup()
      this.editPhone = item.phone
      this.editName = item.name
      this.id = item._id
      console.log(this.id)
    },
    editSubmitContact() {
      this.editContact(this.id)
    },
    editContact(id) {
      console.log(id)
      const JWT_TOKEN = localStorage.getItem('token')
      return fetch(`https://api.diploma.ml/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify({
          name: this.name,
          phone: this.phone,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(new Error())
        })
        .then(this.$store.commit('popup/togglePopUp'))
        .then(window.location.reload())
        .catch((err) => {
          console.log(err)
          this.serverError = 'Что-то пошло не так...'
        })
    },
  },
  mounted() {
    const JWT_TOKEN = localStorage.getItem('token')
    const headerTitle = document.querySelector('.header__title')
    const headerSubtitle = document.querySelector('.header__subtitle')
    if (JWT_TOKEN && JWT_TOKEN !== undefined) {
      headerTitle.textContent = 'Мои контакты'
      headerSubtitle.textContent = ''
      this.getName(JWT_TOKEN)
      return axios
        .get('https://api.diploma.ml/contacts', {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data)
          console.log(res.data.data)
          this.contactsAmount = res.data.data.length
          this.contacts = res.data.data
        })
    } else {
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
.saved-headings {
  padding-bottom: 56px;
}
.saved-headings__title {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: rgba(26, 27, 34, 0.5);
  margin: 40px auto 0 0;
}
.saved-headings__amount {
  font-family: Roboto Slab, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 46px;
  color: #1a1b22;
  max-width: 530px;
  margin: 28px auto 0 0;
}
.add-btn {
  outline: none;
  border: 1px solid black;
  background-color: transparent;
  padding: 15px;
  margin-top: 24px;
  cursor: pointer;
}
.result {
}
.result__container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.contact {
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}
.contact__title {
}
.contact__phone {
}
.contact__icons {
  position: absolute;
  top: 20px;
  right: 20px;
}
.contact__action {
  cursor: pointer;
}
.popup__form {
  background: #ffffff;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  width: 430px;
  padding: 34px 36px 28px;
  position: relative;
  box-sizing: border-box;
}
.popup__title {
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  color: #1a1b22;
  margin: 0;
}
.popup__label {
  display: block;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #2f71e5;
  margin-top: 30px;
}
.popup__input {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  margin-top: 9px;
  padding-bottom: 10px;
  width: 100%;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  caret-color: #2f71e5;
}

.popup__input::placeholder {
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  opacity: 0.2;
}

.popup__input:focus {
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}
.popup__error {
  margin-top: 3px;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #ff0000;
}

.popup__error_server {
  margin: 17px auto 0;
  text-align: center;
}
.popup__button {
  margin: 8px auto 0;
  border-radius: 100px;
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 20px;
  padding-top: 20px;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}

.popup__button_active {
  background: #2f71e5;
  box-shadow: 0px 5px 15px rgba(14, 26, 57, 0.2);
  color: #ffffff;
  cursor: pointer;
}

.popup__button_disable {
  color: #b6bcbf;
  background: #e6e8eb;
}
.popup__call {
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000000;
}
.popap__call_default {
  text-align: left;
}
.popup__link {
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #2f71e5;
  cursor: pointer;
  margin-top: 14px;
}
@media screen and (max-width: 320px) {
  .popup__form {
    width: 100vw;
    padding: 16px 16px 100px;
    position: fixed;
    top: 56px;
    left: 0;
  }
}

@media screen and (max-width: 768px) {
  .saved-headings__title {
    font-size: 14px;
    margin: 0;
  }
  .saved-headings__amount {
    font-size: 30px;
    line-height: 34px;
    margin: 16px auto 0 0;
  }
}
@media screen and (max-width: 320px) {
  .saved-headings__title {
    font-size: 12px;
  }
}
</style>
