var app = new Vue({
    el: "#app",
    data: {
        users: [],
        newUser: { nome: "", cognome: "" },
        editingUser: null
    },
    mounted() {
        this.loadUsersFromStorage(); // Carica gli utenti dal Web Storage al caricamento della pagina
    },
    methods: {
        addUser() {
            // Aggiungi il nuovo utente alla lista
            this.users.push(this.newUser);
            // Reimposta i campi del nuovo utente
            this.newUser = { nome: "", cognome: "" };
            this.saveUsersToStorage(); // Salva gli utenti nel Web Storage
        },
        editUser(user) {
            // Crea una copia dell'utente originale
            this.originalUser = { ...user };
            // Imposta l'utente da modificare
            this.editingUser = user;
        },
        saveUser() {
            // Salva le modifiche all'utente
            this.editingUser = null;
            this.originalUser = null;
            this.saveUsersToStorage(); // Salva gli utenti nel Web Storage
        },
        cancelEdit() {
            // Annulla la modifica all'utente ripristinando la copia originale
            var index = this.users.indexOf(this.editingUser);
            this.users.splice(index, 1, this.originalUser);
            this.editingUser = null;
            this.originalUser = null;
            this.saveUsersToStorage(); // Salva gli utenti nel Web Storage
        },
        deleteUser(user) {
            // Rimuovi l'utente dalla lista
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this.saveUsersToStorage(); // Salva gli utenti nel Web Storage
        },
        saveUsersToStorage() {
            // Salva gli utenti nel Web Storage come stringa JSON
            localStorage.setItem('users', JSON.stringify(this.users));
        },
        loadUsersFromStorage() {
            // Carica gli utenti dal Web Storage
            var users = localStorage.getItem('users');
            if (users) {
                this.users = JSON.parse(users);
            }
            else{
                var defaultUsers = [
                    { nome: "Mario", cognome: "Rossi" },
                    { nome: "Luigi", cognome: "Verdi" },
                ];

                // Salva il JSON predefinito nel localStorage
                localStorage.setItem('users', JSON.stringify(defaultUsers));

                // Assegna il JSON predefinito alla variabile users
                this.users = defaultUsers;
            }
        }
    }
});