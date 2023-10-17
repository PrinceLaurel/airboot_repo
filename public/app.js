document.addEventListener('DOMContentLoaded', function() {
    // Din kod här kommer att köra efter att DOM har laddats
    //console.log('DOM fully loaded and parsed');
    
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
});

const loadData = () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('taskInfo', JSON.stringify(data));
            populateData(data);
        })
};

const populateData = (data) => {
    const datalist = document.getElementById('datalist');
    datalist.innerHTML = '';
    const ul = document.createElement('ul');
    data.forEach(taskInfo => {
        const li = document.createElement('li');
        li.innerText = taskInfo.name;
        ul.appendChild(li);
    })
    datalist.appendChild(ul);
};

const addData = () => {
    let name = prompt('give name');
   // let number = prompt('give number');
    let taskInfo = JSON.parse(localStorage.getItem('taskInfo'));
    taskInfo.push(name); //(taskName, number);
    localStorage.setItem('taskInfo', JSON.stringify(taskInfo));
    populateData(taskInfo);

};
