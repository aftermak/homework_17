const xhr = new XMLHttpRequest();
const URL = 'https://reqres.in/api';
const cardList = document.getElementById('card-list');
const newCardList = document.getElementById('new-card-list');
const buttonPrew = document.getElementById('action-prew');
const buttonNext = document.getElementById('action-next');
const cardUserTemplate = document.getElementById('card-user').innerHTML;
const cardNewUserTemplate = document.getElementById('card-new-user').innerHTML;

const getUsers = (page = 1) => {
    xhr.open ('GET',`${URL}/users?page=${page}`, false)

    xhr.send();

    return JSON.parse(xhr.response);
};

const addCardsList = (users, template) => {
    let result = '';

    users
        .map ((user) => {
            return {
                ...user,
                name: `${user.first_name} ${user.last_name}`
            }
        })
        .forEach(user => {
            result += template
                .replaceAll('{{name}}', user.name)
                .replaceAll('{{email}}', user.email)
                .replaceAll('{{avatar}}', user.avatar)
        });

    cardList.innerHTML = result;
};

(() => {
    let currentPage = 1;
    const {data: users} = getUsers();

    addCardsList(users, cardUserTemplate);

    buttonNext.addEventListener('click', () => {
        const {data: users} = getUsers(++currentPage); 
        addCardsList(users, cardUserTemplate);
    })

    buttonPrew.addEventListener('click', () => {
        const {data: users} = getUsers(--currentPage); 
        addCardsList(users, cardUserTemplate);
    })
})();

const buttonCreate = document.getElementById('action-create');
const form = document.getElementById('create-form');
const getFirstNameUser = document.getElementById('first-name-user');
const getLastNameUser = document.getElementById('last-name-user');
const getEmailUser = document.getElementById('email-user');
const getJobUser = document.getElementById('job-user');
const newUsersList = [];

const getUserData = () =>{
    return {
        first_name: getFirstNameUser.value,
        last_name: getLastNameUser.value,
        email: getEmailUser.value,
        job: getJobUser.value    
    }
};

const createUser = (user) => {
    xhr.open ('POST',`${URL}/users`, false)

    xhr.setRequestHeader('content-type', 'application/json')

    xhr.send(user);

    return JSON.parse(xhr.response);
};

const addNewCardsList = (user, template) => {
    let result = '';

    user
        .map ((user) => {
            return {
                ...user,
                name: `${user.first_name} ${user.last_name}`
            }
        })
        .forEach(user => {
            result += template
                .replaceAll('{{name}}', user.name)
                .replaceAll('{{email}}', user.email)
                .replaceAll('{{job}}', user.job)
        });

    newCardList.innerHTML = result;
};

buttonCreate.addEventListener('click', () => {
    const user = JSON.stringify(getUserData());
    newUsersList.push(createUser(user))
    addNewCardsList(newUsersList, cardNewUserTemplate);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getFirstNameUser.value = null;
    getLastNameUser.value = null;
    getEmailUser.value = null;
    getJobUser.value = null;    
})






