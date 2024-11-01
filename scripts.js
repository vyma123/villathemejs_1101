const container = document.querySelector('.main > .form');
const saveData = document.getElementById('saveData');

window.addEventListener('load', () => {
    const saveForms = JSON.parse(localStorage.getItem('forms')) || [];
  
    saveForms.forEach((form) => {
      if (form.type === 'textarea') {
        addTextareaField(form);
      } else if (form.type === 'btn') {
        addButtonField(form);
      } else {
        addInputField(form);
      }
    });
  });

  function saveDataToLocal() {
    const forms = document.querySelectorAll(
      '.main > .form > .form_main'
    );
  
    let checkEmpty = [false, false, false];
  
    const formData = Array.from(forms).map((form) => {
      const inputs = form.querySelectorAll(
        'input, select'
      );
      
      const data = {};
  
      inputs.forEach((input) => {
        if (input.id === 'name' && input.value.trim() === '') {
          input.classList.add('warning');
          checkEmpty[0] = true;
        } else if (input.id === 'name2' && input.value.trim() === '') {
          input.classList.add('warning');
          checkEmpty[1] = true;
        } else if (input.id === 'id3' && input.value.trim() === '') {
          input.classList.add('warning');
          checkEmpty[2] = true;
        } else {input.classList.remove('warning');}
  
        input.addEventListener('focus', () => {
          input.classList.remove('warning');
        });
  
        data[input.id] = input.type === 'checkbox' ? input.checked : input.value;});
  
      if (form.querySelector('#type')) {
        data.type = form.querySelector('#type').value;
      } else if (form.querySelector('#type3')) {
        data.type = 'btn';
      } else if (form.querySelector('#wrap2')) {
        data.type = 'textarea';
      }
      
      // console.log(data.type);
      return data;
    });
  
    const errMsg = ['Name input field is required', 'Name Textarea field is required', 'Id button field is required'];

    for(let i = 0;i<checkEmpty.length;i++){
      if(checkEmpty[i]){
        alert(errMsg[i]);
        return;
      }
    }

    alert("Đã lưu");
    localStorage.setItem('forms', JSON.stringify(formData));
  }

  function updateDataToLocal() {
    const forms = document.querySelectorAll(
      '.main > .form > .form_main'
    );

    let checkEmpty = [false, false, false];
  
    const formData = Array.from(forms).map((form) => {
      const inputs = form.querySelectorAll(
        'input, select'
      );
      
      const data = {};
  
      inputs.forEach((input) => {
        if (input.id === 'name' && input.value.trim() === '') {
          input.classList.add('warning');
          checkEmpty[0] = true;
        } else if (input.id === 'name2' && input.value.trim() === '') {
          input.classList.add('warning');
          checkEmpty[1] = true;
        } else if (input.id === 'id3' && input.value.trim() === '') {
          input.classList.add('warning');
          checkEmpty[2] = true;
        } else {
          input.classList.remove('warning');
        }
  
        input.addEventListener('focus', () => {
          input.classList.remove('warning');
        });
  
        data[input.id] = input.type === 'checkbox' ? input.checked : input.value;
      });
  
      if (form.querySelector('#type')) {
        data.type = form.querySelector('#type').value;
      } else if (form.querySelector('#type3')) {
        data.type = 'btn';
      } else if (form.querySelector('#wrap2')) {
        data.type = 'textarea';
      }
  
      return data;
    });
  
    // console.log('đã xóa')
    localStorage.setItem('forms', JSON.stringify(formData));
  }

function addInputField(data = {}) {
    const id = Date.now();

    const optionTypes = [
      'button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 
        'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 
        'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'
      ];
      
      const optionDatas = optionTypes.map(type => { 
        return `<option value="${type}" ${data.type === type ? 'selected' : ''}>${type}</option>`}).join('');

    const formHTML = `
      <div class="form_main" data-id="${id}">
          <div class="section">
              <div class="forms">
                  <div class="content">
                      <div class="box_top">
                          <p class="name">Input field</p>
                          <button class="delete" onclick="deleteForm(${id})">
                              <ion-icon name="close-outline"></ion-icon>
                          </button>
                      </div>
                      <form class="form" name='forms' >
                          <div class="box_input">
                              <label class="label" for="type">Type</label>
                              <select id='type'>
                                  ${optionDatas}
                              </select>
                          </div>
                          <div class="box_input">
                              <label for="label">Label</label>
                              <input  type="text" id="label" name="label" required value="${data.label || ''}">
                          </div>
                          <div class="box_input">
                              <label for="name">Name</label>
                              <input type="text" placeholder='required' id="name" name="name" required value="${data.name || ''}">
                          </div>
                          <div class="box_input">
                              <label for="id">Id</label>
                              <input type="text" id="id" name="id" required value="${data.id || ''}">
                          </div>
                          <div class="box_input">
                              <label for="placeholder">Placeholder</label>
                              <input type="text" id="placeholder" name="placeholder" required value="${data.placeholder || ''}">
                          </div>
                          <div class="box_input end">
                              <label for="required">Required</label>
                              <input class="last_input" type="checkbox" id="required" name="required" ${data.required ? 'checked' : ''}>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    `;
  
    container.insertAdjacentHTML('beforeend', formHTML);
  }

function addTextareaField(data = {}) {
    const id = Date.now();
    const formHTML = `
      <div class="form_main" data-id='${id}'>
          <div class="section">
              <div class="forms">
                  <div class="content">
                      <div class="box_top">
                          <p class="name">Textarea field</p>
                          <button class="delete" onclick="deleteForm(${id})">
                              <ion-icon name="close-outline"></ion-icon>
                          </button>
                      </div>
                      <form class="form">
                          <div class="box_input">
                              <label class="wrap2" for="type">Wrap</label>
                              <select id='wrap2'>
                                  <option value="hard" ${data.wrap2 === 'hard'? 'selected': ''}>hard</option>
                                  <option value="soft" ${data.wrap2 === 'soft'? 'selected': ''}>soft</option>
                              </select>
                          </div>
                          <div class="box_input">
                              <label for="name2">Name</label>
                              <input value="${data.name2 || ''}" type="text" id="name2" name="name2" placeholder='required' required>
                          </div>
                          <div class="box_input">
                              <label for="row2">Rows</label>
                              <input value="${data.rows2 || '' }" type="number" id="rows2" onkeypress="return isNumberKey(event)" name="rows2" required>
                          </div>
                          <div class="box_input">
                              <label for="cols2">Columns</label>
                              <input value="${data.cols2 || '' }" type="number" id="cols2" onkeypress="return isNumberKey(event)" name="cols2" required>
                          </div>
                          <div class="box_input end">
                              <label for="readonly2">Readonly</label>
                              <input ${data.readonly2 ? 'checked' : '' } class="last_input" type="checkbox" id="readonly2" name="readonly2" required>
                          </div>
                          <div class="box_input end">
                              <label for="required2">Required</label>
                              <input ${data.required2 ? 'checked' : ''} class="last_input" type="checkbox" id="required2" name="required2" required>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      `;
    container.insertAdjacentHTML('beforeend', formHTML);
  }

function addButtonField(data = {}) {
    const id = Date.now();
    const optionTypes = ['button', 'reset', 'submit'];
    const optionDatas = optionTypes.map(type =>{
      return `<option value="${type}" ${data.type3 === type ? 'selected' : ''}>${type}</option>`}).join('');

    const formHTML = `
      <div class="form_main" data-id='${id}'>
          <div class="section">
              <div class="forms">
                  <div class="content">
                      <div class="box_top">
                          <p class="name">Button field</p>
                          <button class="delete"  onclick="deleteForm(${id})">
                              <ion-icon name="close-outline"></ion-icon>
                          </button>
                      </div>
                      <form class="form">
                          <div class="box_input">
                              <label class="label3" for="type">Type</label>
                              <select id='type3'>
                                 ${optionDatas}
                              </select>
                          </div>
                          <div class="box_input">
                              <label for="name3">Name</label>
                              <input  value="${data.name3 || ''}"  type="text" id="name3" name="name3" required>
                          </div>
                          <div class="box_input">
                              <label for="id3">Id</label>
                              <input value="${data.id3 || ''}" type="text" id="id3" name="id3" placeholder='required' required>
                          </div>
                          <div class="box_input">
                              <label for="value3">Value</label>
                              <input value="${data.value3 || ''}" type="text" id="value3" name="value3" required>
                          </div>
                          <div class="box_input end">
                              <label for="disabled3">Disabled</label>
                              <input ${data.disabled3 ? 'checked' : ''}
                               class="last_input" type="checkbox" id="disabled3" name="disabled3" required>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      `;
    container.insertAdjacentHTML('beforeend', formHTML);
  }

  function deleteForm(id) {
    const form = document.querySelector(
      `.main > .form > .form_main[data-id ="${id}"]`
    );
    if (form) {
      form.remove();
      updateDataToLocal();
    }
  }

  saveData.addEventListener('click', function (event) {
    event.preventDefault();
    saveDataToLocal();
  });
  

  function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false; 
    }
    var inputField = evt.target;
    var currentValue = inputField.value;

    if (currentValue.length === 0 && charCode === 48) {
        return false; 
    }
    return true; 
}
