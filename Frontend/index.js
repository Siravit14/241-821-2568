const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE';
let selectedId = "";

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    if (id) {
        mode = 'EDIT';
        selectedId = id;
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            console.log('response', response.data);
        }catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
}

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('First name is required');
    }
    if (!userData.lastName) {
        errors.push('Last name is required');
    }
    if (!userData.gender) {
        errors.push('Gender is required');
    }
    if (!userData.age) {
        errors.push('Age is required');
    }
    if (!userData.description) {
        errors.push('Description is required');
    }
    if (!userData.interests) {
        errors.push('At least one interest is required');
    }
    return errors;
}

const displayMessage = (text, type) => {
    const msgBox = document.getElementById('msg');
    msgBox.innerText = text;
    msgBox.className = `notification-inline ${type}`;
    msgBox.style.display = 'block';

    setTimeout(() => {
        msgBox.style.display = 'none';
    }, 3000);
}

const submitData = async () => {
    try {
        //const response = await axios.get(`${BASE_URL}/users/${selectedId}`);
        const user = response.data;
        console.log('Fetched user data for editing:', user);
        let firstNameDOM = document.querySelector('input[name=firstname]');
        let lastNameDOM = document.querySelector('input[name=lastname]');
        let ageDOM = document.querySelector('input[name=age]');
        //let genderDOM = document.querySelector('input[name=gender]:checked')||{};
        //let interestDOMs = document.querySelectorAll('input[name=interests]:checked');
        let descriptionDOM = document.querySelector('textarea[name=description]');

        firstNameDOM.value = user.firstName;
        lastNameDOM.value = user.lastName;
        ageDOM.value = user.age;
        descriptionDOM.value = user.description;

        let genderDOM = document.querySelector(`input[name=gender]`);
        let interestDOMs = document.querySelectorAll(`input[name=interests]`);
        for (let i = 0; i < genderDOM.length; i++) {
            if (genderDOM[i].value === user.gender) {
                genderDOM[i].checked = true;
            }
        }
        for (let i = 0; i < interestDOMs.length; i++) {
            if (user.interests.includes(interestDOMs[i].value)) {
                interestDOMs[i].checked = true;
            }
        }
        // --- ส่วนที่เพิ่มเข้ามา: ตรวจสอบข้อมูลเบื้องต้น ---
        //if (!firstNameDOM.value.trim() || !lastNameDOM.value.trim()) {
           // displayMessage('กรุณากรอกชื่อและนามสกุลให้ครบถ้วน ⚠️', 'error');
           // return; // หยุดการทำงานทันที ไม่ให้ไปถึงขั้นตอน axios.post
       // }

        //if (!genderDOM) {
        //    displayMessage('กรุณาเลือกเพศ ⚠️', 'error');
        //    return;
        //}
        // -------------------------------------------

        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value 
            if (i != interestDOMs.length - 1) {
                interest += ','
            }
        }

        let userData = {
            firstName: firstNameDOM.value,
            lastName: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM ? genderDOM.value : '', 
            description: descriptionDOM.value,
            interests: interest
        }

        console.log('Sending data:', userData);
        
        const errors = validateData(userData);
        if (errors.length > 0) {
            throw {
                message: 'กรอกข้อมูลไม่ครบถ้วน',
                errors: errors
            }
        }
        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/users`, userData);
            console.log('Response:', response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData);
            message: 'User updated successfully',
            console.log('Response:', response.data);
        }

        const response = await axios.post(`${BASE_URL}/users`, userData);
        
        console.log('Response:', response.data);
        displayMessage('บันทึกข้อมูลสำเร็จ ✅', 'success');

        // แถม: ล้างข้อมูลในช่องกรอกหลังจากบันทึกสำเร็จ (ถ้าต้องการ)
        // firstNameDOM.value = '';
        // lastNameDOM.value = '';

    } catch (error) {
        console.log('error message:', error.message);
        console.log('error', error.errors);

        let htmlData = '<div>';
        htmlData += `<div>${error.message}</div>`;
        htmlData += '<ul>';
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        console.error('เกิดข้อผิดพลาด:', error);
        displayMessage('บันทึกข้อมูลไม่สำเร็จ ❌', 'error');
    }
}