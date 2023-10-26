document.addEventListener('DOMContentLoaded', () => {
    const contactsTable = document.getElementById('contacts-table');
    
    const fetchContacts = async () => {
        try {
            const response = await fetch('/contacts');
            const contacts = await response.json();
            renderContacts(contacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    const renderContacts = contacts => {
        contactsTable.innerHTML = '';  
       
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Namn</th>
                    <th scope="col">Epost</th>
                    <th scope="col">Kommando</th>
                </tr>
             </thead>
        `;

        contactsTable.appendChild(thead);

        contacts.forEach((contact, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editContact(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteContact('${contact.id}')">Delete</button>
                </td>
            `;
            contactsTable.appendChild(row);
        });
    }

    const deleteContact = async (id) => {
        console.log('delete called for: ' + id);
        try {
            const response = await fetch(`/contacts/${id}`, {
                method: 'DELETE'
            });
            await fetchContacts();  
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    }
    
    window.deleteContact = deleteContact;
    fetchContacts();  
});
    /*
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
        li.innerText = contact.name + ' ' + contact.email;
        ul.appendChild(li);
    })
    datalist.appendChild(ul);
};

const addData = () => {
    let name = prompt('give name');
    let email = prompt('give email');
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.push({name, email});
    localStorage.setItem('contacts', JSON.stringify(contacts));
    populateData(contacts);

};
*/