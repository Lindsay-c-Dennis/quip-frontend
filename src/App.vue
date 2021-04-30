<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1 style="display: in-line">Quiplash Whenever!</h1><h5 style="display: in-line"> Write Quiplash prompts whenever you think of them!</h5>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-btn v-if="!googleUser" @click="login">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
      Login with Google
        </v-btn>
        <v-card v-else>
          <v-card-title>Welcome to Quiplash Whenever, {{ userName }}!</v-card-title>
          <v-btn color="success" @click="promptModal = true"><v-icon>mdi-pen-plus</v-icon>Write a New Prompt</v-btn>
          <v-dialog persistent v-model="promptModal">
            <v-card>
              <v-form lazy-validation  v-model="valid" ref="promptForm">
                <v-select label="Select a Game" :items="games" v-model="selectedGame"></v-select>
                <v-switch
                  v-model="isThriplash"
                  :label="`Is this a Thriplash? ${isThriplash ? 'Yes!' : 'Nope'}`"
                ></v-switch>
                <v-textarea :rules="promptRules" v-model="promptText" label="Prompt" :counter="120"></v-textarea>
                <v-btn color="primary" @click="submit">Submit Prompt</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    isThriplash: null,
    games: [{text: 'Latest', value: 'latest'}],
    googleUser: null,
    promptModal: null,
    promptRules: [
        v => !!v || 'Prompt is required',
        v => v.length <= 120 || 'Prompt must be less than 120 characters',
      ],
    promptText: '',
    selectedGame: {text: 'Latest', value: 'latest'},
    userName: '',
    valid: false
  }),
  methods: {
    async login() {
      this.googleUser = await this.$gAuth.signIn()
      const profile = await this.googleUser.getBasicProfile()
      this.userName = profile.Ue;
    },
    submit() {
      this.$refs.promptForm.validate();
    }
  }
};
</script>
