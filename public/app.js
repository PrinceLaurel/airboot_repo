document.addEventListener('DOMContentLoaded', function() {
    // Din kod här kommer att köra efter att DOM har laddats
    //console.log('DOM fully loaded and parsed');
    //<div id="app" /> i body
    const url = 'http://localhost:4242/contacts';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const contactsDiv = document.getElementById('contacts');
            const ul = document.createElement('ul');
            data.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `${contact.name} - ${contact.email}`;
                ul.appendChild(li);
            });
            contactsDiv.appendChild(ul);
        })
        .catch(error => {
            console.error('There has been a prolem with your fetch operation', error);
        });
    });
    
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const p = document.createElement('p');
    p.textContent = 'Hello from client js';
    app.appendChild(p);

    const btn = document.createElement('button');
    btn.textContent = 'Load data';
    btn.addEventListener('click', loadData);
    app.appendChild(btn);

    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Add new data';
    btnAdd.addEventListener('click', addData);
    app.appendChild(btnAdd);

    const datalist = document.createElement('div');
    datalist.id = 'datalist';
    app.appendChild(datalist);
//base is not defined

const loadData = () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('contacts', JSON.stringify(data));
            populateData(data);
        })
        .then(data => {
            localStorage.getItem('contacts', data);
        })
};

const populateData = (data) => {
    const datalist = document.getElementById('datalist');
    datalist.innerHTML = '';
    const ul = document.createElement('ul');
    data.forEach(contact => {
        const li = document.createElement('li');
      //  const li2 = document.createElement('li2');
        li.innerText = contact.name + ' ' + contact.email;
      //  li2.innerText = taskInfo.number;
        ul.appendChild(li); //(li, li2)
    })
    datalist.appendChild(ul);
};

const addData = () => {
    let name = prompt('give name');
    let email = prompt('give email');
   // let number = prompt('give number');
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.push({name, email}); //(name, number);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    populateData(contacts);

};

